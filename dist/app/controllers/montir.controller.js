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
exports.MontirController = void 0;
const fs_1 = __importDefault(require("fs"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const montir_models_1 = __importDefault(require("../models/montir.models"));
const montir_service_model_1 = __importDefault(require("../models/montir.service.model"));
const kendaraan_models_1 = __importDefault(require("../models/kendaraan.models"));
const order_model_1 = __importDefault(require("../models/order.model"));
const pengendara_models_1 = __importDefault(require("../models/pengendara.models"));
const service_model_1 = __importDefault(require("../models/service.model"));
const multer_2 = require("../utils/multer");
const order_status_1 = require("../utils/order.status");
exports.MontirController = {
    updateMontir(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const montirAdmin = req.userId;
                const admin = yield montir_models_1.default.findOne({ where: { user_id: montirAdmin } });
                if (!admin) {
                    return res.status(403).json({
                        message: "Require Role!"
                    });
                }
                const { id, nama, phone, deskripsi, jenis_montir, pengalaman, is_available } = req.body;
                let foto_url = [];
                if (req.files) {
                    const files = req.files;
                    foto_url = files.map(file => {
                        const filename = path_1.default.basename(file.path);
                        return `${req.protocol}://${req.get("host")}/images/${filename}`;
                    });
                }
                const montir = yield montir_models_1.default.findByPk(id);
                if (!montir) {
                    return res.status(404).json({
                        message: "Montir not found"
                    });
                }
                // Lakukan pemrosesan perubahan atribut montir di sini
                montir.nama = nama;
                montir.phone = phone;
                montir.deskripsi = deskripsi;
                montir.jenis_montir = jenis_montir;
                montir.pengalaman = pengalaman;
                montir.is_available = is_available;
                montir.foto_url = JSON.stringify(foto_url);
                yield montir.save();
                res.status(200).json({
                    message: "Montir updated successfully",
                    data: montir
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
    createLayanan(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const montirOwner = req.userId;
                const montir = yield montir_models_1.default.findOne({ where: { user_id: montirOwner } });
                if (!montir) {
                    return res.status(403).json({
                        message: "Require Montir Role!"
                    });
                }
                const { montir_id, harga, layanan } = req.body;
                const montirown = yield montir_models_1.default.findByPk(montir_id);
                if (!montirown) {
                    return res.status(404).json({
                        message: "Montir not found"
                    });
                }
                if (montirown.user_id !== montir.id) {
                    return res.status(403).json({
                        message: "Unauthorized: Only the Montir can add services"
                    });
                }
                const montirServiceExists = yield montir_service_model_1.default.findOne({
                    where: { montir_id: montir.id }
                });
                if (montirServiceExists) {
                    return res.status(409).json({
                        message: "Layanan already created for this Montir"
                    });
                }
                let services = yield service_model_1.default.findOne({ where: { layanan: layanan } });
                if (!services) {
                    services = yield service_model_1.default.create({ layanan: layanan });
                }
                else {
                    return res.status(409).json({
                        message: "Layanan already exists"
                    });
                }
                const montirservice = yield montir_service_model_1.default.create({
                    montir_id: montir.id,
                    service_id: services.id,
                    harga: harga
                });
                return res.status(201).json({
                    message: "Layanan created successfully",
                    data: montirservice
                });
            }
            catch (error) {
                return res.status(500).json({ message: error.message || "Internal Server Error" });
            }
        });
    },
    getMontirOrderService(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const montirOwner = req.userId;
                const montir = yield montir_models_1.default.findOne({ where: { user_id: montirOwner } });
                if (!montir) {
                    return res.status(403).json({
                        message: "Require Role!"
                    });
                }
                // fetch bengkel order
                const orders = yield order_model_1.default.findAll({
                    where: {
                        montir_id: montir.id,
                        order_status_id: order_status_1.ORDER_PAID_STATUS_ID
                    },
                    include: [
                        {
                            model: pengendara_models_1.default,
                            as: "pengendara",
                            attributes: ["nama", "phone", "foto", "lokasi",],
                            include: [
                                {
                                    model: kendaraan_models_1.default,
                                    as: "kendaraan",
                                    attributes: ["nama_kendaraan", "jenis", "plat"],
                                }
                            ]
                        },
                        {
                            model: service_model_1.default,
                            as: 'services',
                            attributes: { exclude: ['createdAt', 'updatedAt'] },
                            through: {
                                attributes: ['price']
                            }
                        }
                    ],
                    attributes: { exclude: ['pengendara_id', 'montir_id'] },
                });
                return res.status(200).json({
                    message: "Montir order fetched successfully",
                    data: orders
                });
            }
            catch (error) {
                return res.status(500).json({ message: error.message || "Internal Server Error" });
            }
        });
    },
    // todo: pikirkan cara untuk membatalkan order yang sudah diterima jika melebihi waktu tertentu
    acceptOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const montirOwner = req.userId;
                const montir = yield montir_models_1.default.findOne({ where: { user_id: montirOwner } });
                if (!montir) {
                    return res.status(403).json({
                        message: "Require Admin Montir Role!"
                    });
                }
                const order_id = req.params.orderId;
                const order = yield order_model_1.default.findByPk(order_id);
                if (!order) {
                    return res.status(404).json({ message: 'Order not found' });
                }
                // Assuming the 'status' field holds the status name or ID
                order.order_status_id = order_status_1.ORDER_ACCEPTED_STATUS_ID;
                yield order.save();
                return res.status(200).json({ message: 'Order accepted' });
            }
            catch (error) {
                return res.status(500).json({ message: error.message || "Internal Server Error" });
            }
        });
    },
    cancelOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const montirOwner = req.userId;
                const montir = yield montir_models_1.default.findOne({ where: { user_id: montirOwner } });
                if (!montir) {
                    return res.status(403).json({
                        message: "Require Montir Bengkel Role!"
                    });
                }
                const order_id = req.params.orderId;
                const order = yield order_model_1.default.findByPk(order_id);
                if (!order) {
                    return res.status(404).json({ message: 'Order not found' });
                }
                // Assuming the 'status' field holds the status name or ID
                order.order_status_id = order_status_1.ORDER_CANCELED_STATUS_ID;
                yield order.save();
                return res.status(200).json({ message: 'Order cancelled' });
            }
            catch (error) {
                return res.status(500).json({ message: error.message || "Internal Server Error" });
            }
        });
    },
    completedOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const montirOwner = req.userId;
                const montir = yield montir_models_1.default.findOne({ where: { user_id: montirOwner } });
                if (!montir) {
                    return res.status(403).json({
                        message: "Require Admin Montir Role!"
                    });
                }
                const order_id = req.params.orderId;
                const order = yield order_model_1.default.findByPk(order_id);
                if (!order) {
                    return res.status(404).json({ message: 'Order not found' });
                }
                // Assuming the 'status' field holds the status name or ID
                order.order_status_id = order_status_1.ORDER_COMPLETED_STATUS_ID;
                yield order.save();
                return res.status(200).json({ message: 'Order completed' });
            }
            catch (error) {
                return res.status(500).json({ message: error.message || "Internal Server Error" });
            }
        });
    },
};
//# sourceMappingURL=montir.controller.js.map