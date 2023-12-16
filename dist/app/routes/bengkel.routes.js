"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bengkel_controller_1 = require("../controllers/bengkel.controller");
const auth_1 = require("../middleware/auth");
const multer_1 = __importDefault(require("../utils/multer"));
const bengkelRouter = (0, express_1.Router)();
bengkelRouter.post("/create-bengkel", multer_1.default.array('foto_url'), auth_1.AuthMiddleware.verifyToken, auth_1.AuthMiddleware.isAdminBengkel, bengkel_controller_1.BengkelController.createBengkel);
bengkelRouter.post("/create-layanan", auth_1.AuthMiddleware.verifyToken, auth_1.AuthMiddleware.isAdminBengkel, bengkel_controller_1.BengkelController.createLayanan);
bengkelRouter.get("/get-bengkel-order-service", auth_1.AuthMiddleware.verifyToken, auth_1.AuthMiddleware.isAdminBengkel, bengkel_controller_1.BengkelController.getBengkelOrderService);
bengkelRouter.get("/get-detail-bengkel-order-service/:orderId", auth_1.AuthMiddleware.verifyToken, auth_1.AuthMiddleware.isAdminBengkel, bengkel_controller_1.BengkelController.getDetailBengkelOrderService);
bengkelRouter.get("/get-completed-bengkel-order-service", auth_1.AuthMiddleware.verifyToken, auth_1.AuthMiddleware.isAdminBengkel, bengkel_controller_1.BengkelController.getCompletedBengkelOrderService);
bengkelRouter.get("/get-cancelled-bengkel-order-service", auth_1.AuthMiddleware.verifyToken, auth_1.AuthMiddleware.isAdminBengkel, bengkel_controller_1.BengkelController.getCanceledBengkelOrderService);
bengkelRouter.post("/order/:orderId/accept", auth_1.AuthMiddleware.verifyToken, auth_1.AuthMiddleware.isAdminBengkel, bengkel_controller_1.BengkelController.acceptOrder);
bengkelRouter.post("/order/:orderId/cancel", auth_1.AuthMiddleware.verifyToken, auth_1.AuthMiddleware.isAdminBengkel, bengkel_controller_1.BengkelController.cancelOrder);
bengkelRouter.post("/order/:orderId/completed", auth_1.AuthMiddleware.verifyToken, auth_1.AuthMiddleware.isAdminBengkel, bengkel_controller_1.BengkelController.completedOrder);
exports.default = bengkelRouter;
//# sourceMappingURL=bengkel.routes.js.map