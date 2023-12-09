"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = __importDefault(require("./router"));
const pengendara_controller_1 = require("../controllers/pengendara.controller");
const auth_1 = require("../middleware/auth");
// Get Bengkel
router_1.default.get("/get-all-bengkel", auth_1.AuthMiddleware.verifyToken, auth_1.AuthMiddleware.isPengendara, pengendara_controller_1.PengendaraController.getAllBengkel);
router_1.default.get("/get-detail-bengkel/:id", auth_1.AuthMiddleware.verifyToken, auth_1.AuthMiddleware.isPengendara, pengendara_controller_1.PengendaraController.getDetailBengkel);
// Get Bengkel Review
router_1.default.post("/add-review-bengkel", auth_1.AuthMiddleware.verifyToken, auth_1.AuthMiddleware.isPengendara, pengendara_controller_1.PengendaraController.addReviewBengkel);
router_1.default.get("/get-detail-review-bengkel/:id", auth_1.AuthMiddleware.verifyToken, auth_1.AuthMiddleware.isPengendara, pengendara_controller_1.PengendaraController.getDetailReviewBengkel);
// Order Bengkel Service
router_1.default.post("/order-bengkel-service", auth_1.AuthMiddleware.verifyToken, auth_1.AuthMiddleware.isPengendara, pengendara_controller_1.PengendaraController.orderBengkelService);
// Get Montir Review
router_1.default.post("/add-review-montir", auth_1.AuthMiddleware.verifyToken, auth_1.AuthMiddleware.isPengendara, pengendara_controller_1.PengendaraController.addReviewMontir);
router_1.default.get("/get-detail-review-montir/:id", auth_1.AuthMiddleware.verifyToken, auth_1.AuthMiddleware.isPengendara, pengendara_controller_1.PengendaraController.getDetailReviewMontir);
exports.default = router_1.default;
//# sourceMappingURL=pengendara.routes.js.map