import { responseHandler } from "../response/responseHandler.js";
import { deleteImageFromS3 } from "./s3.js";

export const deleteImage = async (req, res) => {
    try {
        const key = req.query.key
        deleteImageFromS3(key)
        return responseHandler(res, 200, "Image Deleted Successfully", true)
    } catch (error) {
        return responseHandler(res, 400, error.message, false)
    }
}