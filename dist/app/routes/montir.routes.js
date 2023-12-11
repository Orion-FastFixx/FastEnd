"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = __importDefault(require("./router"));
const montir_controller_1 = require("../controllers/montir.controller");
const auth_1 = require("../middleware/auth");
router_1.default.post("/create-layanan-montir", auth_1.AuthMiddleware.verifyToken, auth_1.AuthMiddleware.isMontir, montir_controller_1.MontirController.createLayanan);
router_1.default.get("/get-montir-order-service", auth_1.AuthMiddleware.verifyToken, auth_1.AuthMiddleware.isMontir, montir_controller_1.MontirController.getMontirOrderService);
router_1.default.post("/order-montir/:orderId/accept", auth_1.AuthMiddleware.verifyToken, auth_1.AuthMiddleware.isMontir, montir_controller_1.MontirController.acceptOrder);
router_1.default.post("/order-montir/:orderId/cancel", auth_1.AuthMiddleware.verifyToken, auth_1.AuthMiddleware.isMontir, montir_controller_1.MontirController.cancelOrder);
router_1.default.post("/order-montir/:orderId/completed", auth_1.AuthMiddleware.verifyToken, auth_1.AuthMiddleware.isMontir, montir_controller_1.MontirController.completedOrder);
exports.default = router_1.default;
//# sourceMappingURL=montir.routes.js.map