import { config } from "dotenv";
import AWS from "aws-sdk";
import { responseHandler } from "../response/responseHandler";

config()

export const s3Bucket = async (location, image, imageName, res) => {
    try {

        const s3 = new AWS.S3({
            secretAccessKey: process.env.SECRET_KEY,
            accessKeyId: process.env.ACCESS_KEY,
            region: process.env.BUCKET_REGION,
        });

        const params = {
            Bucket: process.env.BUCKET_NAME,
            Key: `${location}/${imageName}`,
            Body: image.data,
            ContentType: image.mimetype
        };

        const { Location } = await s3.upload(params).promise();
        return { Location, key: params.Key };

    } catch (err) {
        return responseHandler(res, 400, err.message, false)
    }
};


export const deleteImageFromS3 = async (key) => {
    try {

        const s3 = new AWS.S3({
            secretAccessKey: process.env.SECRET_KEY,
            accessKeyId: process.env.ACCESS_KEY,
            region: process.env.BUCKET_REGION,
        });

        const params = {
            Bucket: process.env.BUCKET_NAME,
            Key: key,
        };

        const result = await s3.deleteObject(params).promise();
    } catch (error) {
        throw new Error("Failed to delete image from S3 bucket.");
    }
}