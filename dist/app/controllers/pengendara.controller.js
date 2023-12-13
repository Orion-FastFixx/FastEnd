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
exports.PengendaraController = void 0;
const bengkel_models_1 = __importDefault(require("../models/bengkel.models"));
const service_model_1 = __importDefault(require("../models/service.model"));
const pengendara_models_1 = __importDefault(require("../models/pengendara.models"));
const bengkel_rating_models_1 = __importDefault(require("../models/bengkel.rating.models"));
const db_1 = require("../../db");
const montir_rating_model_1 = __importDefault(require("../models/montir.rating.model"));
const order_model_1 = __importDefault(require("../models/order.model"));
const order_service_model_1 = __importDefault(require("../models/order.service.model"));
const bengkel_service_model_1 = __importDefault(require("../models/bengkel.service.model"));
const payment_model_1 = __importDefault(require("../models/payment.model"));
const order_status_1 = require("../utils/order.status");
const payment_method_1 = require("../utils/payment.method");
const payment_status_1 = require("../utils/payment.status");
const kendaraan_models_1 = __importDefault(require("../models/kendaraan.models"));
const path_1 = __importDefault(require("path"));
exports.PengendaraController = {
    // feature Bengkel
    getAllBengkel(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.userId;
                const pengendara = yield pengendara_models_1.default.findOne({ where: { user_id: user } });
                if (!pengendara) {
                    return res.status(403).json({
                        message: "Require Pengendara Role!"
                    });
                }
                const bengkel = yield bengkel_models_1.default.findAll({
                    include: [
                        {
                            model: bengkel_rating_models_1.default,
                            as: 'rating',
                            attributes: [
                                [db_1.sequelize.fn('ROUND', db_1.sequelize.fn('AVG', db_1.sequelize.col('bengkel_rating')), 1), 'average_rating'],
                                [db_1.sequelize.fn('COUNT', db_1.sequelize.col('review')), 'review_count']
                            ],
                        }
                    ],
                    attributes: { exclude: ['phone', 'deskripsi', 'pemilik_id', 'createdAt', 'updatedAt'] },
                    group: ['bengkels.id'] // Adjust according to the models' relationships
                });
                return res.status(200).json({
                    message: "Success get all bengkel",
                    data: bengkel
                });
            }
            catch (error) {
                return res.status(500).json({ message: error.message || "Internal Server Error" });
            }
        });
    },
    getDetailBengkel(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.userId;
                const pengendara = yield pengendara_models_1.default.findOne({ where: { user_id: user } });
                if (!pengendara) {
                    return res.status(403).json({
                        message: "Require Pengendara Role!"
                    });
                }
                // Get bengkel_id from route parameters
                const bengkel_id = req.params.id;
                if (!bengkel_id) {
                    return res.status(400).json({
                        message: "Bengkel id is required!"
                    });
                }
                const bengkel = yield bengkel_models_1.default.findOne({
                    where: { id: bengkel_id },
                    include: [
                        {
                            // populate Services and BengkelService
                            model: service_model_1.default,
                            as: 'services',
                            attributes: { exclude: ['createdAt', 'updatedAt'] },
                            through: {
                                attributes: ['harga'],
                                as: 'harga_layanan'
                            }
                        },
                        {
                            model: bengkel_rating_models_1.default,
                            as: 'rating',
                            attributes: [
                                [db_1.sequelize.fn('ROUND', db_1.sequelize.fn('AVG', db_1.sequelize.col('bengkel_rating')), 1), 'average_rating'],
                                [db_1.sequelize.fn('COUNT', db_1.sequelize.col('review')), 'review_count']
                            ],
                        }
                    ],
                    attributes: { exclude: ['pemilik_id', 'createdAt', 'updatedAt'] },
                    group: ['bengkels.id', 'services.id'] // Adjust according to the models' relationships
                });
                return res.status(200).json({
                    message: "Success get detail bengkel",
                    data: bengkel
                });
            }
            catch (error) {
                return res.status(500).json({ message: error.message || "Internal Server Error" });
            }
        });
    },
    addReviewBengkel(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const transaction = yield db_1.sequelize.transaction();
            try {
                const user = req.userId;
                const pengendara = yield pengendara_models_1.default.findOne({ where: { user_id: user } });
                if (!pengendara) {
                    yield transaction.rollback();
                    return res.status(403).json({
                        message: "Require Pengendara Role!"
                    });
                }
                const { bengkel_rating, review, bengkel_id } = req.body;
                const hasOrder = yield order_model_1.default.findOne({
                    where: {
                        bengkel_id: bengkel_id,
                        pengendara_id: pengendara.id,
                        order_status_id: order_status_1.ORDER_COMPLETED_STATUS_ID
                    },
                });
                if (!hasOrder) {
                    yield transaction.rollback();
                    return res.status(403).json({
                        message: "Review not allowed. You must completed order services from this bengkel first."
                    });
                }
                const existingReview = yield bengkel_rating_models_1.default.findOne({
                    where: {
                        bengkel_id: bengkel_id,
                        pengendara_id: pengendara.id
                    }
                });
                if (existingReview) {
                    yield transaction.rollback();
                    return res.status(403).json({
                        message: "You have already review this bengkel!"
                    });
                }
                const ReviewBengkel = yield bengkel_rating_models_1.default.create({
                    bengkel_rating,
                    review,
                    bengkel_id,
                    pengendara_id: pengendara.id,
                    transaction
                });
                yield transaction.commit(); // Commit the transaction
                return res.status(201).json({
                    message: "Review Bengkel created successfully",
                    data: ReviewBengkel
                });
            }
            catch (error) {
                yield transaction.rollback(); // Rollback transaction if any errors were encountered
                return res.status(500).json({ message: error.message || "Internal Server Error" });
            }
        });
    },
    getDetailReviewBengkel(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.userId;
                const pengendara = yield pengendara_models_1.default.findOne({ where: { user_id: user } });
                if (!pengendara) {
                    return res.status(403).json({
                        message: "Require Pengendara Role!"
                    });
                }
                // Get bengkel_id from route parameters
                const bengkel_id = req.params.id;
                if (!bengkel_id) {
                    return res.status(400).json({
                        message: "Bengkel id is required!"
                    });
                }
                const ReviewBengkel = yield bengkel_rating_models_1.default.findAll({
                    where: {
                        bengkel_id: bengkel_id,
                    },
                    include: [{
                            model: pengendara_models_1.default,
                            as: 'pengendara',
                            attributes: ['nama', 'foto']
                        }],
                    attributes: { exclude: ['pengendara_id'] },
                });
                // Calculate the average rating and count of ratings
                const reviewSummary = yield bengkel_rating_models_1.default.findOne({
                    where: { bengkel_id: bengkel_id },
                    attributes: [
                        [db_1.sequelize.fn('ROUND', db_1.sequelize.fn('AVG', db_1.sequelize.col('bengkel_rating')), 1), 'average_rating'],
                        [db_1.sequelize.fn('COUNT', db_1.sequelize.col('bengkel_rating')), 'rating_count']
                    ],
                    raw: true
                });
                return res.status(200).json({
                    message: "Success get all review bengkel",
                    data: {
                        review_summary: reviewSummary,
                        review_all: ReviewBengkel
                    }
                });
            }
            catch (error) {
                return res.status(500).json({ message: error.message || "Internal Server Error" });
            }
        });
    },
    orderBengkelService(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const transaction = yield db_1.sequelize.transaction();
            try {
                const user = req.userId;
                const pengendara = yield pengendara_models_1.default.findOne({ where: { user_id: user } });
                if (!pengendara) {
                    yield transaction.rollback();
                    return res.status(403).json({
                        message: "Require Pengendara Role!"
                    });
                }
                const { bengkel_id, service_id, precise_location, fullName, complaint } = req.body;
                // init total price
                let totalPrice = 0;
                // add admin fee
                const adminFee = 1000;
                // store service price
                let servicePrice = [];
                for (const serviceId of service_id) {
                    const bengkelService = yield bengkel_service_model_1.default.findOne({
                        where: {
                            bengkel_id: bengkel_id,
                            service_id: serviceId
                        }
                    });
                    if (!bengkelService) {
                        yield transaction.rollback();
                        return res.status(400).json({
                            message: "Service not found!"
                        });
                    }
                    totalPrice += bengkelService.harga;
                    servicePrice[serviceId] = bengkelService.harga;
                }
                const newOrder = yield order_model_1.default.create({
                    additional_info: { precise_location, fullName, complaint },
                    pengendara_id: pengendara.id,
                    bengkel_id,
                    order_status_id: order_status_1.ORDER_PENDING_STATUS_ID,
                    transaction
                });
                for (const serviceId of service_id) {
                    yield order_service_model_1.default.create({
                        order_id: newOrder.id,
                        service_id: serviceId,
                        price: servicePrice[serviceId],
                        transaction
                    });
                }
                const totalPayment = totalPrice + adminFee;
                yield newOrder.update({
                    total_harga: totalPayment
                });
                yield transaction.commit(); // Commit the transaction
                return res.status(201).json({
                    message: "Order created successfully",
                    data: newOrder
                });
            }
            catch (error) {
                yield transaction.rollback(); // Rollback transaction if any errors were encountered
                return res.status(500).json({ message: error.message || "Internal Server Error" });
            }
        });
    },
    payBengkelService(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const transaction = yield db_1.sequelize.transaction();
            try {
                const user = req.userId;
                const pengendara = yield pengendara_models_1.default.findOne({ where: { user_id: user } });
                if (!pengendara) {
                    yield transaction.rollback();
                    return res.status(403).json({
                        message: "Require Pengendara Role!"
                    });
                }
                const { order_id, payment_method_id } = req.body;
                // fetch order
                const order = yield order_model_1.default.findOne({
                    where: {
                        id: order_id,
                        pengendara_id: pengendara.id
                    },
                    transaction
                });
                const paidOrder = yield payment_model_1.default.findOne({
                    where: {
                        order_id: order_id,
                        payment_status_id: payment_status_1.PAYMENT_PAID_STATUS_ID,
                    }
                });
                if (!order) {
                    yield transaction.rollback();
                    return res.status(404).json({
                        message: "Order not found!"
                    });
                }
                if (paidOrder) {
                    yield transaction.rollback();
                    return res.status(400).json({
                        message: "Order already paid!"
                    });
                }
                if (!payment_method_id) {
                    yield transaction.rollback();
                    return res.status(400).json({
                        message: "Payment method is required!"
                    });
                }
                if (payment_method_id == payment_method_1.PAYMENT_METHOD_CASH) {
                    yield payment_model_1.default.create({
                        order_id,
                        payment_method_id,
                        payment_status_id: payment_status_1.PAYMENT_PAID_STATUS_ID,
                        transaction
                    });
                    order.order_status_id = order_status_1.ORDER_PAID_STATUS_ID;
                    yield order.save({ transaction });
                }
                else if (payment_method_id == payment_method_1.PAYMENT_METHOD_TRANSFER) {
                    yield payment_model_1.default.create({
                        order_id,
                        payment_method_id,
                        payment_status_id: payment_status_1.PAYMENT_PAID_STATUS_ID,
                        transaction
                    });
                    order.order_status_id = order_status_1.ORDER_PAID_STATUS_ID;
                    yield order.save({ transaction });
                }
                else {
                    yield transaction.rollback();
                    return res.status(400).json({
                        message: "Payment method not found!"
                    });
                }
                yield transaction.commit(); // Commit the transaction
                return res.status(201).json({
                    message: "Payment created successfully",
                });
            }
            catch (error) {
                yield transaction.rollback(); // Rollback transaction if any errors were encountered
                return res.status(500).json({ message: error.message || "Internal Server Error" });
            }
        });
    },
    cancelOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const transaction = yield db_1.sequelize.transaction();
            try {
                const user = req.userId;
                const pengendara = yield pengendara_models_1.default.findOne({ where: { user_id: user } });
                if (!pengendara) {
                    yield transaction.rollback();
                    return res.status(403).json({
                        message: "Require Pengendara Role!"
                    });
                }
                const order_id = req.params.orderId;
                if (!order_id) {
                    yield transaction.rollback();
                    return res.status(400).json({
                        message: "Order id is required!"
                    });
                }
                const order = yield order_model_1.default.findOne({
                    where: {
                        id: order_id,
                        pengendara_id: pengendara.id,
                        transaction
                    }
                });
                if (!order) {
                    yield transaction.rollback();
                    return res.status(404).json({
                        message: "Order not found!"
                    });
                }
                order.order_status_id = order_status_1.ORDER_CANCELED_STATUS_ID;
                yield order.save();
                yield transaction.commit(); // Commit the transaction
                return res.status(200).json({
                    message: "Order cancelled",
                    order
                });
            }
            catch (error) {
                yield transaction.rollback(); // Rollback transaction if any errors were encountered
                return res.status(500).json({ message: error.message || "Internal Server Error" });
            }
        });
    },
    // End feature Bengkel
    addReviewMontir(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.userId;
                const pengendara = yield pengendara_models_1.default.findOne({ where: { user_id: user } });
                if (!pengendara) {
                    return res.status(403).json({
                        message: "Require Pengendara Role!"
                    });
                }
                const { montir_rating, review, montir_id } = req.body;
                const existingReview = yield montir_rating_model_1.default.findOne({
                    where: {
                        montir_id: montir_id,
                        pengendara_id: pengendara.id
                    }
                });
                if (existingReview) {
                    return res.status(403).json({
                        message: "You have already review this montir!"
                    });
                }
                const ReviewMontir = yield montir_rating_model_1.default.create({
                    montir_rating,
                    review,
                    montir_id,
                    pengendara_id: pengendara.id
                });
                return res.status(201).json({
                    message: "Review Montir created successfully",
                    data: ReviewMontir
                });
            }
            catch (error) {
                return res.status(500).json({ message: error.message || "Internal Server Error" });
            }
        });
    },
    getDetailReviewMontir(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.userId;
                const pengendara = yield pengendara_models_1.default.findOne({ where: { user_id: user } });
                if (!pengendara) {
                    return res.status(403).json({
                        message: "Require Pengendara Role!"
                    });
                }
                // Get montir_id from route parameters
                const montir_id = req.params.id;
                if (!montir_id) {
                    return res.status(400).json({
                        message: "Montir id is required!"
                    });
                }
                const ReviewMontir = yield montir_rating_model_1.default.findAll({
                    where: {
                        montir_id: montir_id,
                    },
                    include: [{
                            model: pengendara_models_1.default,
                            as: 'pengendara',
                            attributes: ['nama', 'foto']
                        }],
                    attributes: { exclude: ['pengendara_id'] },
                });
                // Calculate the average rating and count of ratings
                const reviewSummary = yield montir_rating_model_1.default.findOne({
                    where: { montir_id: montir_id },
                    attributes: [
                        [db_1.sequelize.fn('ROUND', db_1.sequelize.fn('AVG', db_1.sequelize.col('montir_rating')), 1), 'average_rating'],
                        [db_1.sequelize.fn('COUNT', db_1.sequelize.col('montir_rating')), 'rating_count']
                    ],
                    raw: true
                });
                return res.status(200).json({
                    message: "Success get all review montir",
                    data: {
                        review_summary: reviewSummary,
                        review_all: ReviewMontir
                    }
                });
            }
            catch (error) {
                return res.status(500).json({ message: error.message || "Internal Server Error" });
            }
        });
    },
    // feature account setting
    getAllKendaraan(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.userId;
                const pengendara = yield pengendara_models_1.default.findOne({ where: { user_id: user } });
                if (!pengendara) {
                    return res.status(403).json({
                        message: "Require Pengendara Role!"
                    });
                }
                const kendaraan = yield kendaraan_models_1.default.findAll({
                    where: {
                        pengendara_id: pengendara.id
                    },
                    attributes: ['nama_kendaraan'],
                });
                if (!kendaraan) {
                    return res.status(404).json({
                        message: "Kendaraan not found!"
                    });
                }
                return res.status(200).json({
                    message: "Success get all kendaraan",
                    data: kendaraan
                });
            }
            catch (error) {
                return res.status(500).json({ message: error.message || "Internal Server Error" });
            }
        });
    },
    addKendaraan(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const transaction = yield db_1.sequelize.transaction();
            try {
                const user = req.userId;
                const pengendara = yield pengendara_models_1.default.findOne({ where: { user_id: user } });
                if (!pengendara) {
                    yield transaction.rollback();
                    return res.status(403).json({
                        message: "Require Pengendara Role!"
                    });
                }
                const { nama_kendaraan, jenis, tahun_kendaraan, plat } = req.body;
                const newKendaraan = yield kendaraan_models_1.default.create({
                    nama_kendaraan,
                    jenis,
                    tahun_kendaraan,
                    plat,
                    pengendara_id: pengendara.id,
                    transaction
                });
                yield transaction.commit(); // Commit the transaction
                return res.status(201).json({
                    message: "Kendaraan created successfully",
                    data: newKendaraan
                });
            }
            catch (error) {
                yield transaction.rollback(); // Rollback transaction if any errors were encountered
                return res.status(500).json({ message: error.message || "Internal Server Error" });
            }
        });
    },
    updateKendaraan(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const transaction = yield db_1.sequelize.transaction();
            try {
                const user = req.userId;
                const pengendara = yield pengendara_models_1.default.findOne({ where: { user_id: user } });
                if (!pengendara) {
                    yield transaction.rollback();
                    return res.status(403).json({
                        message: "Require Pengendara Role!"
                    });
                }
                const { nama_kendaraan, jenis, tahun_kendaraan, plat } = req.body;
                const kendaraanId = req.params.id;
                if (!kendaraanId) {
                    yield transaction.rollback();
                    return res.status(400).json({
                        message: "Kendaraan id is required!"
                    });
                }
                const kendaraan = yield kendaraan_models_1.default.findOne({
                    where: {
                        id: kendaraanId,
                        pengendara_id: pengendara.id
                    },
                    transaction
                });
                if (!kendaraan) {
                    yield transaction.rollback();
                    return res.status(404).json({
                        message: "Kendaraan not found!"
                    });
                }
                kendaraan.nama_kendaraan = nama_kendaraan;
                kendaraan.jenis = jenis;
                kendaraan.tahun_kendaraan = tahun_kendaraan;
                kendaraan.plat = plat;
                yield kendaraan.save({ transaction });
                yield transaction.commit(); // Commit the transaction
                return res.status(200).json({
                    message: "Kendaraan updated successfully",
                    data: kendaraan
                });
            }
            catch (error) {
                yield transaction.rollback(); // Rollback transaction if any errors were encountered
                return res.status(500).json({ message: error.message || "Internal Server Error" });
            }
        });
    },
    deleteKendaraan(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const transaction = yield db_1.sequelize.transaction();
            try {
                const user = req.userId;
                const pengendara = yield pengendara_models_1.default.findOne({ where: { user_id: user } });
                if (!pengendara) {
                    yield transaction.rollback();
                    return res.status(403).json({
                        message: "Require Pengendara Role!"
                    });
                }
                const kendaraanId = req.params.id;
                if (!kendaraanId) {
                    yield transaction.rollback();
                    return res.status(400).json({
                        message: "Kendaraan id is required!"
                    });
                }
                const kendaraan = yield kendaraan_models_1.default.findOne({
                    where: {
                        id: kendaraanId,
                        pengendara_id: pengendara.id
                    },
                    transaction
                });
                if (!kendaraan) {
                    yield transaction.rollback();
                    return res.status(404).json({
                        message: "Kendaraan not found!"
                    });
                }
                yield kendaraan.destroy({ transaction });
                yield transaction.commit(); // Commit the transaction
                return res.status(200).json({
                    message: "Kendaraan deleted successfully",
                });
            }
            catch (error) {
                yield transaction.rollback(); // Rollback transaction if any errors were encountered
                return res.status(500).json({ message: error.message || "Internal Server Error" });
            }
        });
    },
    updateProfilePengendara(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const transaction = yield db_1.sequelize.transaction();
            try {
                const user = req.userId;
                const pengendara = yield pengendara_models_1.default.findOne({ where: { user_id: user } });
                if (!pengendara) {
                    yield transaction.rollback();
                    return res.status(403).json({
                        message: "Require Pengendara Role!"
                    });
                }
                const { nama, phone, lokasi } = req.body;
                const placeHolderImgPath = `${req.protocol}://${req.get("host")}/placeholder/user_placeholder.png`;
                let fotoUrl = placeHolderImgPath; // Default to placeholder
                if (req.file) {
                    const filename = path_1.default.basename(req.file.path); // Extract filename from path
                    fotoUrl = `${req.protocol}://${req.get("host")}/images/${filename}`;
                }
                const newLokasi = lokasi ? lokasi : null;
                pengendara.nama = nama;
                pengendara.foto = fotoUrl;
                pengendara.phone = phone;
                pengendara.lokasi = newLokasi;
                yield pengendara.save({ transaction });
                yield transaction.commit(); // Commit the transaction
                return res.status(200).json({
                    message: "Profile updated successfully",
                    data: pengendara
                });
            }
            catch (error) {
                yield transaction.rollback(); // Rollback transaction if any errors were encountered
                return res.status(500).json({ message: error.message || "Internal Server Error" });
            }
        });
    },
    // End feature account setting
};
//# sourceMappingURL=pengendara.controller.js.map