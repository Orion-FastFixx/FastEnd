"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.maxSize = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const config_1 = require("../config");
const fs_1 = __importDefault(require("fs"));
const md5_1 = __importDefault(require("md5"));
// Create uploads directory if it doesn't exist
const uploadsDir = config_1.config.uploadsFolder;
if (!fs_1.default.existsSync(uploadsDir)) {
    fs_1.default.mkdirSync(uploadsDir, { recursive: true });
}
// Multer storage configuration
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        const fileName = (0, md5_1.default)(file.originalname + Date.now());
        const ext = path_1.default.extname(file.originalname);
        cb(null, fileName + ext);
    }
});
const fileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
// maxsize 10MB
exports.maxSize = 10 * 1024 * 1024;
const uploads = (0, multer_1.default)({
    storage,
    fileFilter,
    limits: { fileSize: exports.maxSize }
});
exports.default = uploads;
//# sourceMappingURL=multer.js.map