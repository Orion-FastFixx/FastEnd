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
exports.BengkelController = void 0;
const bengkel_models_1 = __importDefault(require("../models/bengkel.models"));
const admin_bengkel_model_1 = __importDefault(require("../models/admin.bengkel.model"));
const service_model_1 = __importDefault(require("../models/service.model"));
const bengkel_service_model_1 = __importDefault(require("../models/bengkel.service.model"));
exports.BengkelController = {
    createBengkel(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bengkelOwner = req.userId;
                const adminBengkel = yield admin_bengkel_model_1.default.findOne({ where: { user_id: bengkelOwner } });
                if (!adminBengkel) {
                    return res.status(403).json({
                        message: "Require Admin Bengkel Role!"
                    });
                }
                const { nama_bengkel, phone_bengkel, alamat, lokasi, deskripsi, jenis_bengkel, spesialisasi_bengkel, is_open, foto, rating_id } = req.body;
                // check if bengkel already exist
                const bengkel = yield bengkel_models_1.default.findOne({ where: { nama_bengkel: nama_bengkel } });
                if (bengkel) {
                    return res.status(409).json({
                        message: "Bengkel already exist"
                    });
                }
                const newBengkel = yield bengkel_models_1.default.create({
                    nama_bengkel,
                    phone_bengkel,
                    alamat,
                    lokasi,
                    deskripsi,
                    jenis_bengkel,
                    spesialisasi_bengkel,
                    is_open,
                    foto,
                    pemilik_id: adminBengkel.id,
                    rating_id
                });
                res.status(201).json({
                    message: "Bengkel created successfully",
                    data: newBengkel
                });
            }
            catch (error) {
                res.status(500).json({ message: error.message || "Internal Server Error" });
            }
        });
    },
    createLayanan(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bengkelOwner = req.userId;
                const adminBengkel = yield admin_bengkel_model_1.default.findOne({ where: { id: bengkelOwner } });
                if (!adminBengkel) {
                    res.status(403).json({
                        message: "Require Admin Bengkel Role!"
                    });
                }
                const { bengkel_id, layanan, harga } = req.body;
                const bengkel = yield bengkel_models_1.default.findByPk(bengkel_id);
                if (!bengkel) {
                    res.status(404).json({
                        message: "Bengkel not found"
                    });
                }
                let services = yield service_model_1.default.findOne({ where: { layanan: layanan } });
                if (!services) {
                    services = yield service_model_1.default.create({ layanan: layanan });
                }
                const bengkelService = yield bengkel_service_model_1.default.create({
                    bengkel_id: bengkel.id,
                    service_id: services.id,
                    harga: harga
                });
                return res.status(201).json({
                    message: "Layanan created successfully",
                    data: bengkelService
                });
            }
            catch (error) {
                return res.status(500).json({ message: error.message || "Internal Server Error" });
            }
        });
    },
};
//# sourceMappingURL=bengkel.controller.js.map