"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const multer_2 = require("../utils/multer");
const admin_models_1 = __importDefault(require("../models/admin.models"));
const montir_models_1 = __importDefault(require("../models/montir.models"));
const bengkel_models_1 = __importDefault(require("../models/bengkel.models"));
const edukasi_models_1 = __importDefault(require("../models/edukasi.models"));
exports.AdminController = {
    getAllMontir(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const superAdmin = req.userId;
                const admin = yield admin_models_1.default.findOne({ where: { user_id: superAdmin } });
                if (!admin) {
                    return res.status(403).json({
                        message: "Require Admin Role!"
                    });
                }
                const montir = yield montir_models_1.default.findAll({});
                res.status(200).json({
                    message: "Success get all montir",
                    data: montir
                });
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    },
    getAllBengkel(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const superAdmin = req.userId;
                const admin = yield admin_models_1.default.findOne({ where: { user_id: superAdmin } });
                if (!admin) {
                    return res.status(403).json({
                        message: "Require Admin Role!"
                    });
                }
                const bengkel = yield bengkel_models_1.default.findAll({});
                res.status(200).json({
                    message: "Success get all montir",
                    data: bengkel
                });
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    },
    // create new education
    createEducation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const superAdmin = req.userId;
                const admin = yield admin_models_1.default.findOne({ where: { user_id: superAdmin } });
                if (!admin) {
                    return res.status(403).json({
                        message: "Require Admin Role!"
                    });
                }
                const { judul, jenis_kendaraan, kategori, sub_judul, isi_konten } = req.body;
                console.log(req.body);
                let foto_url = [];
                if (req.files) {
                    const files = req.files;
                    foto_url = files.map(file => {
                        const filename = path_1.default.basename(file.path);
                        return `${req.protocol}://${req.get("host")}/images/${filename}`;
                    });
                }
                const newEducation = yield edukasi_models_1.default.create({
                    judul,
                    jenis_kendaraan,
                    kategori,
                    sub_judul,
                    isi_konten,
                    foto_url: JSON.stringify(foto_url),
                    user_id: admin.id,
                });
                return res.status(201).json({
                    message: "Education created successfully",
                    data: newEducation
                });
            }
            catch (error) {
                if (req.files) {
                    req.files.forEach((file) => {
                        fs_1.default.unlinkSync(file.path); // Use the correct type for 'file'
                    });
                }
                // Check if the error is related to file size
                if (error instanceof multer_1.default.MulterError && error.code === 'LIMIT_FILE_SIZE') {
                    return res.status(413).json({
                        message: `One or more files are too large. Maximum file size allowed is ${multer_2.maxSize}.`,
                        error: error
                    });
                }
                return res.status(500).json({ message: error.message || "Internal Server Error" });
            }
        });
    },
    // show all content
    getAllContent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const superAdmin = req.userId;
                const admin = yield admin_models_1.default.findOne({ where: { user_id: superAdmin } });
                if (!admin) {
                    return res.status(403).json({
                        message: "Require Admin Role!"
                    });
                }
                const content = yield edukasi_models_1.default.findAll({});
                res.status(200).json({
                    message: "Success get all content",
                    data: content
                });
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    },
    // edit content
    updateContent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const superAdmin = req.userId;
                const admin = yield admin_models_1.default.findOne({ where: { user_id: superAdmin } });
                if (!admin) {
                    return res.status(403).json({
                        message: "Require Admin Role!"
                    });
                }
                const { judul, jenis_kendaraan, kategori, sub_judul, isi_konten } = req.body;
                let foto_url = [];
                if (req.files) {
                    const files = req.files;
                    foto_url = files.map(file => {
                        const filename = path_1.default.basename(file.path);
                        return `${req.protocol}://${req.get("host")}/images/${filename}`;
                    });
                }
                const content_id = req.params.id;
                if (!content_id) {
                    return res.status(400).json({
                        message: "Education id is required!"
                    });
                }
                const content = yield edukasi_models_1.default.findOne({ where: { content_id: content_id } });
                if (!content) {
                    return res.status(404).json({
                        message: "Content not found"
                    });
                }
                // Lakukan pemrosesan perubahan atribut montir di sini
                content.judul = judul;
                content.jenis_kendaraan = jenis_kendaraan;
                content.kategori = kategori;
                content.sub_judul = sub_judul;
                content.isi_konten = isi_konten;
                yield content.save();
                res.status(200).json({
                    message: "Content updated successfully",
                });
            }
            catch (error) {
                if (req.files) {
                    req.files.forEach((file) => {
                        fs_1.default.unlinkSync(file.path);
                    });
                }
                if (error instanceof multer_1.default.MulterError && error.code === 'LIMIT_FILE_SIZE') {
                    return res.status(413).json({
                        message: `One or more files are too large. Maximum file size allowed is ${multer_2.maxSize}.`,
                        error: error
                    });
                }
                return res.status(500).json({ message: error.message || "Internal Server Error" });
            }
        });
    },
    // delete content
    deleteContent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const superAdmin = req.userId;
                const admin = yield admin_models_1.default.findOne({ where: { user_id: superAdmin } });
                if (!admin) {
                    return res.status(403).json({
                        message: "Require Admin Role!"
                    });
                }
                const { judul } = req.body;
                const content = yield edukasi_models_1.default.findOne({ where: { judul: judul } });
                if (!content) {
                    return res.status(404).json({
                        message: "Content not found"
                    });
                }
                yield content.destroy();
                res.status(200).json({
                    message: "Content deleted successfully",
                });
            }
            catch (error) {
                return res.status(500).json({
                    message: error.message || "Internal Server Error"
                });
            }
        });
    }
};
//# sourceMappingURL=admin.controller.js.map