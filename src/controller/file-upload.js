import { User } from "../model/user.js";
import { s3Bucket } from "./s3.js";
import { responseHandler } from "../response/responseHandler.js";
import { getFileType } from "./file-type.js";

export const fileUpload = async (req, res) => {
    try {
        if (!req.files || !req.files.image) {
            return responseHandler(res, 400, "Please upload a proper file", false);
        }

        const image = req.files.image;
        const extension = image.name.split(".").pop();

        // File type validation
        const mediaType = getFileType(extension);
        if (mediaType === 0) {
            return responseHandler(res, 400, "Unknown file format", false);
        }

        if (image.size > 5000000) {
            return responseHandler(res, 400, "Maximum file size limit exceeded", false);
        }

        if (mediaType === "IMAGE") {
            const imageName = image.md5 + Date.now() + "." + image.name.split(".").pop();
            const s3Url = await s3Bucket(Date.now(),image,imageName,res);

            const imageUrl = await User.create({
                name: imageName,
                url: s3Url.Location,
                key: s3Url.key
            });

            if (imageUrl) {
                return responseHandler(res, 200, "Image stored successfully", true,s3Url.Location);
            }
        }
    } catch (err) {
        return responseHandler(res, 500, err.message, false);
    }
};
