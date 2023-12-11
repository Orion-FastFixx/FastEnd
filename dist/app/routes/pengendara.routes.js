"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pengendara_controller_1 = require("../controllers/pengendara.controller");
const auth_1 = require("../middleware/auth");
const admin_controller_1 = require("../controllers/admin.controller");
const pengendaraRouter = (0, express_1.Router)();
// Get Bengkel
pengendaraRouter.get("/get-all-bengkel", auth_1.AuthMiddleware.verifyToken, auth_1.AuthMiddleware.isPengendara, pengendara_controller_1.PengendaraController.getAllBengkel);
pengendaraRouter.get("/get-detail-bengkel/:id", auth_1.AuthMiddleware.verifyToken, auth_1.AuthMiddleware.isPengendara, pengendara_controller_1.PengendaraController.getDetailBengkel);
// Get Bengkel Review
pengendaraRouter.post("/add-review-bengkel", auth_1.AuthMiddleware.verifyToken, auth_1.AuthMiddleware.isPengendara, pengendara_controller_1.PengendaraController.addReviewBengkel);
pengendaraRouter.get("/get-detail-review-bengkel/:id", auth_1.AuthMiddleware.verifyToken, auth_1.AuthMiddleware.isPengendara, pengendara_controller_1.PengendaraController.getDetailReviewBengkel);
// Order Bengkel Service
pengendaraRouter.post("/order-bengkel-service", auth_1.AuthMiddleware.verifyToken, auth_1.AuthMiddleware.isPengendara, pengendara_controller_1.PengendaraController.orderBengkelService);
// Pay Order
pengendaraRouter.post("/pay-order", auth_1.AuthMiddleware.verifyToken, auth_1.AuthMiddleware.isPengendara, pengendara_controller_1.PengendaraController.payBengkelService);
// Cancel Order
pengendaraRouter.post("/cancel-order/:orderId", auth_1.AuthMiddleware.verifyToken, auth_1.AuthMiddleware.isPengendara, pengendara_controller_1.PengendaraController.cancelOrder);
// Get Montir
pengendaraRouter.get("/get-all-montir", auth_1.AuthMiddleware.verifyToken, auth_1.AuthMiddleware.isPengendara, admin_controller_1.AdminController.getAllMontir);
pengendaraRouter.get("/get-detail-montir/:id", auth_1.AuthMiddleware.verifyToken, auth_1.AuthMiddleware.isPengendara, pengendara_controller_1.PengendaraController.getDetailBengkel);
// Get Montir Review
pengendaraRouter.post("/add-review-montir", auth_1.AuthMiddleware.verifyToken, auth_1.AuthMiddleware.isPengendara, pengendara_controller_1.PengendaraController.addReviewMontir);
pengendaraRouter.get("/get-detail-review-montir/:id", auth_1.AuthMiddleware.verifyToken, auth_1.AuthMiddleware.isPengendara, pengendara_controller_1.PengendaraController.getDetailReviewMontir);
exports.default = pengendaraRouter;
//# sourceMappingURL=pengendara.routes.js.map