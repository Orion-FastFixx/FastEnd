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
const fs_1 = __importDefault(require("fs"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const admin_bengkel_model_1 = __importDefault(require("../models/admin.bengkel.model"));
const bengkel_models_1 = __importDefault(require("../models/bengkel.models"));
const bengkel_service_model_1 = __importDefault(require("../models/bengkel.service.model"));
const kendaraan_models_1 = __importDefault(require("../models/kendaraan.models"));
const order_model_1 = __importDefault(require("../models/order.model"));
const pengendara_models_1 = __importDefault(require("../models/pengendara.models"));
const service_model_1 = __importDefault(require("../models/service.model"));
const multer_2 = require("../utils/multer");
const order_status_1 = require("../utils/order.status");
const db_1 = require("../../db");
exports.BengkelController = {
    createBengkel(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const transaction = yield db_1.sequelize.transaction();
            try {
                const bengkelOwner = req.userId;
                const adminBengkel = yield admin_bengkel_model_1.default.findOne({ where: { user_id: bengkelOwner } });
                if (!adminBengkel) {
                    yield transaction.rollback();
                    return res.status(403).json({
                        message: "Require Admin Bengkel Role!"
                    });
                }
                const { nama_bengkel, phone_bengkel, alamat, lokasi, deskripsi, jenis_bengkel, spesialisasi_bengkel, is_open } = req.body;
                let foto_url = [];
                if (req.files) {
                    const files = req.files;
                    foto_url = files.map(file => {
                        const filename = path_1.default.basename(file.path); // Extract filename from path
                        return `${req.protocol}://${req.get("host")}/images/${filename}`;
                    });
                }
                // check if bengkel already exist
                const bengkel = yield bengkel_models_1.default.findOne({ where: { nama_bengkel: nama_bengkel } });
                if (bengkel) {
                    if (req.files) {
                        req.files.forEach((file) => {
                            fs_1.default.unlinkSync(file.path); // Use the correct type for 'file'
                        });
                    }
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
                    foto_url: JSON.stringify(foto_url),
                    pemilik_id: adminBengkel.id,
                    transaction
                });
                yield transaction.commit();
                return res.status(201).json({
                    message: "Bengkel created successfully",
                    data: newBengkel
                });
            }
            catch (error) {
                yield transaction.rollback();
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
    createLayanan(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const transaction = yield db_1.sequelize.transaction();
            try {
                const bengkelOwner = req.userId;
                const adminBengkel = yield admin_bengkel_model_1.default.findOne({ where: { user_id: bengkelOwner } });
                if (!adminBengkel) {
                    yield transaction.rollback();
                    return res.status(403).json({
                        message: "Require Admin Bengkel Role!"
                    });
                }
                const { bengkel_id, layanan, harga } = req.body;
                const bengkel = yield bengkel_models_1.default.findByPk(bengkel_id);
                if (!bengkel) {
                    yield transaction.rollback();
                    return res.status(404).json({
                        message: "Bengkel not found"
                    });
                }
                // Check if the adminBengkel is the owner of the bengkel
                if (bengkel.pemilik_id !== adminBengkel.id) {
                    yield transaction.rollback();
                    return res.status(403).json({
                        message: "Unauthorized: Only the Bengkel owner can add services"
                    });
                }
                let services = yield service_model_1.default.findOne({ where: { layanan: layanan } });
                if (!services) {
                    services = yield service_model_1.default.create({ layanan: layanan, transaction });
                }
                const bengkelService = yield bengkel_service_model_1.default.create({
                    bengkel_id: bengkel.id,
                    service_id: services.id,
                    harga: harga,
                    transaction
                });
                yield transaction.commit();
                return res.status(201).json({
                    message: "Layanan created successfully",
                    data: bengkelService
                });
            }
            catch (error) {
                yield transaction.rollback();
                return res.status(500).json({ message: error.message || "Internal Server Error" });
            }
        });
    },
    getBengkelOrderService(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bengkelOwner = req.userId;
                const adminBengkel = yield admin_bengkel_model_1.default.findOne({ where: { user_id: bengkelOwner } });
                if (!adminBengkel) {
                    return res.status(403).json({
                        message: "Require Admin Bengkel Role!"
                    });
                }
                // fetch bengkel order
                const orders = yield order_model_1.default.findAll({
                    where: {
                        bengkel_id: adminBengkel.id,
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
                    attributes: { exclude: ['pengendara_id', 'bengkel_id', 'montir_id'] },
                });
                return res.status(200).json({
                    message: "Bengkel order fetched successfully",
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
                const bengkelOwner = req.userId;
                const adminBengkel = yield admin_bengkel_model_1.default.findOne({ where: { user_id: bengkelOwner } });
                if (!adminBengkel) {
                    return res.status(403).json({
                        message: "Require Admin Bengkel Role!"
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
                const bengkelOwner = req.userId;
                const adminBengkel = yield admin_bengkel_model_1.default.findOne({ where: { user_id: bengkelOwner } });
                if (!adminBengkel) {
                    return res.status(403).json({
                        message: "Require Admin Bengkel Role!"
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
                const bengkelOwner = req.userId;
                const adminBengkel = yield admin_bengkel_model_1.default.findOne({ where: { user_id: bengkelOwner } });
                if (!adminBengkel) {
                    return res.status(403).json({
                        message: "Require Admin Bengkel Role!"
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
//# sourceMappingURL=bengkel.controller.js.map