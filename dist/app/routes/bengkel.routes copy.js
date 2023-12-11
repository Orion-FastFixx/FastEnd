"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = __importDefault(require("./router"));
const bengkel_controller_1 = require("../controllers/bengkel.controller");
const auth_1 = require("../middleware/auth");
const multer_1 = __importDefault(require("../utils/multer"));
router_1.default.post("/create-bengkel", multer_1.default.array('foto_url'), auth_1.AuthMiddleware.verifyToken, auth_1.AuthMiddleware.isAdminBengkel, bengkel_controller_1.BengkelController.createBengkel);
router_1.default.post("/create-layanan", auth_1.AuthMiddleware.verifyToken, auth_1.AuthMiddleware.isAdminBengkel, bengkel_controller_1.BengkelController.createLayanan);
router_1.default.get("/get-bengkel-order-service", auth_1.AuthMiddleware.verifyToken, auth_1.AuthMiddleware.isAdminBengkel, bengkel_controller_1.BengkelController.getBengkelOrderService);
router_1.default.post("/order/:orderId/accept", auth_1.AuthMiddleware.verifyToken, auth_1.AuthMiddleware.isAdminBengkel, bengkel_controller_1.BengkelController.acceptOrder);
router_1.default.post("/order/:orderId/cancel", auth_1.AuthMiddleware.verifyToken, auth_1.AuthMiddleware.isAdminBengkel, bengkel_controller_1.BengkelController.cancelOrder);
router_1.default.post("/order/:orderId/completed", auth_1.AuthMiddleware.verifyToken, auth_1.AuthMiddleware.isAdminBengkel, bengkel_controller_1.BengkelController.completedOrder);
exports.default = router_1.default;
//# sourceMappingURL=bengkel.routes%20copy.js.map