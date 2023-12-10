import multer from "multer";
import path from "path";
import { config } from "../config";
import { Request } from "express"
import fs from "fs";
import md5 from "md5";

// Create uploads directory if it doesn't exist
const uploadsDir = config.uploadsFolder;
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        const fileName = md5(file.originalname + Date.now());
        const ext = path.extname(file.originalname);
        cb(null, fileName + ext);
    }
});

const fileFilter = (req: Request, file: any, cb: any) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

// maxsize 10MB
export const maxSize = 10 * 1024 * 1024;

const uploads = multer({
    storage,
    fileFilter,
    limits: { fileSize: maxSize }
});


export default uploads;

