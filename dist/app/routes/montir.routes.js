"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const montir_controller_1 = require("../controllers/montir.controller");
const auth_1 = require("../middleware/auth");
const montirRouter = (0, express_1.Router)();
montirRouter.put("/update-montir", auth_1.AuthMiddleware.verifyToken, auth_1.AuthMiddleware.isMontir, montir_controller_1.MontirController.updateMontir);
montirRouter.post("/create-layanan-montir", auth_1.AuthMiddleware.verifyToken, auth_1.AuthMiddleware.isMontir, montir_controller_1.MontirController.createLayanan);
montirRouter.get("/get-montir-order-service", auth_1.AuthMiddleware.verifyToken, auth_1.AuthMiddleware.isMontir, montir_controller_1.MontirController.getMontirOrderService);
montirRouter.get("/get-detail-montir-order-service/:orderId", auth_1.AuthMiddleware.verifyToken, auth_1.AuthMiddleware.isMontir, montir_controller_1.MontirController.getDetailMontirOrderService);
montirRouter.get("/get-completed-montir-order-service", auth_1.AuthMiddleware.verifyToken, auth_1.AuthMiddleware.isMontir, montir_controller_1.MontirController.getCompletedMontirOrderService);
montirRouter.get("/get-cancelled-montir-order-service", auth_1.AuthMiddleware.verifyToken, auth_1.AuthMiddleware.isMontir, montir_controller_1.MontirController.getCanceledMontirOrderService);
montirRouter.post("/order-montir/:orderId/accept", auth_1.AuthMiddleware.verifyToken, auth_1.AuthMiddleware.isMontir, montir_controller_1.MontirController.acceptMontirOrderService);
montirRouter.post("/order-montir/:orderId/cancel", auth_1.AuthMiddleware.verifyToken, auth_1.AuthMiddleware.isMontir, montir_controller_1.MontirController.cancelMontirOrderService);
montirRouter.post("/order-montir/:orderId/completed", auth_1.AuthMiddleware.verifyToken, auth_1.AuthMiddleware.isMontir, montir_controller_1.MontirController.completedMontirOrderService);
exports.default = montirRouter;
//# sourceMappingURL=montir.routes.js.map