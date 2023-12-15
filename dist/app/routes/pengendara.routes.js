"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pengendara_controller_1 = require("../controllers/pengendara.controller");
const auth_1 = require("../middleware/auth");
const multer_1 = __importDefault(require("../utils/multer"));
const pengendaraRouter = (0, express_1.Router)();
// Get Bengkel
pengendaraRouter.get("/get-all-bengkel", auth_1.AuthMiddleware.verifyToken, auth_1.AuthMiddleware.isPengendara, pengendara_controller_1.PengendaraController.getAllBengkel);
pengendaraRouter.get("/get-detail-bengkel/:id", auth_1.AuthMiddleware.verifyToken, auth_1.AuthMiddleware.isPengendara, pengendara_controller_1.PengendaraController.getDetailBengkel);
// Get Bengkel Review
pengendaraRouter.post("/add-review-bengkel", auth_1.AuthMiddleware.verifyToken, auth_1.AuthMiddleware.isPengendara, pengendara_controller_1.PengendaraController.addReviewBengkel);
pengendaraRouter.get("/get-detail-review-bengkel/:id", auth_1.AuthMiddleware.verifyToken, auth_1.AuthMiddleware.isPengendara, pengendara_controller_1.PengendaraController.getDetailReviewBengkel);
// Order Bengkel Service
pengendaraRouter.post("/order-bengkel-service", auth_1.AuthMiddleware.verifyToken, auth_1.AuthMiddleware.isPengendara, pengendara_controller_1.PengendaraController.orderBengkelService);
// Get Montir
pengendaraRouter.get("/get-all-montir", auth_1.AuthMiddleware.verifyToken, auth_1.AuthMiddleware.isPengendara, pengendara_controller_1.PengendaraController.getAllMontir);
pengendaraRouter.get("/get-detail-montir/:id", auth_1.AuthMiddleware.verifyToken, auth_1.AuthMiddleware.isPengendara, pengendara_controller_1.PengendaraController.getDetailBengkel);
// Get Montir Review
pengendaraRouter.post("/add-review-montir", auth_1.AuthMiddleware.verifyToken, auth_1.AuthMiddleware.isPengendara, pengendara_controller_1.PengendaraController.addReviewMontir);
pengendaraRouter.get("/get-detail-review-montir/:id", auth_1.AuthMiddleware.verifyToken, auth_1.AuthMiddleware.isPengendara, pengendara_controller_1.PengendaraController.getDetailReviewMontir);
// Account Setting
pengendaraRouter.get("/get-all-kendaraan", auth_1.AuthMiddleware.verifyToken, auth_1.AuthMiddleware.isPengendara, pengendara_controller_1.PengendaraController.getAllKendaraan);
pengendaraRouter.post("/add-kendaraan", auth_1.AuthMiddleware.verifyToken, auth_1.AuthMiddleware.isPengendara, pengendara_controller_1.PengendaraController.addKendaraan);
pengendaraRouter.put("/update-kendaraan/:id", auth_1.AuthMiddleware.verifyToken, auth_1.AuthMiddleware.isPengendara, pengendara_controller_1.PengendaraController.updateKendaraan);
pengendaraRouter.delete("/delete-kendaraan/:id", auth_1.AuthMiddleware.verifyToken, auth_1.AuthMiddleware.isPengendara, pengendara_controller_1.PengendaraController.deleteKendaraan);
pengendaraRouter.put("/update-profile", multer_1.default.single('foto'), auth_1.AuthMiddleware.verifyToken, auth_1.AuthMiddleware.isPengendara, pengendara_controller_1.PengendaraController.updateProfilePengendara);
// Order Montir Service
pengendaraRouter.post("/order-montir-service", auth_1.AuthMiddleware.verifyToken, auth_1.AuthMiddleware.isPengendara, pengendara_controller_1.PengendaraController.orderMontirService);
// Pay Order
pengendaraRouter.post("/pay-order", auth_1.AuthMiddleware.verifyToken, auth_1.AuthMiddleware.isPengendara, pengendara_controller_1.PengendaraController.payOrderService);
// Cancel Order
pengendaraRouter.post("/cancel-order/:orderId", auth_1.AuthMiddleware.verifyToken, auth_1.AuthMiddleware.isPengendara, pengendara_controller_1.PengendaraController.cancelOrder);
exports.default = pengendaraRouter;
//# sourceMappingURL=pengendara.routes.js.map