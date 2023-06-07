import { Router } from "express";
import { fileUpload } from "../controller/file-upload"
import { deleteImage } from "../controller/delete-image";
export const router = Router();


router.post("/upload", fileUpload)
router.delete("/delete", deleteImage)
