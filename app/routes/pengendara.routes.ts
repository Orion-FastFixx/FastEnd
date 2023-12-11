import router from "./router";
import { PengendaraController } from "../controllers/pengendara.controller";
import { AuthMiddleware } from "../middleware/auth";
import Admin from "../models/admin.models";
import { AdminController } from "../controllers/admin.controller";

// Get Bengkel
router.get("/get-all-bengkel", AuthMiddleware.verifyToken, AuthMiddleware.isPengendara, PengendaraController.getAllBengkel);
router.get("/get-detail-bengkel/:id", AuthMiddleware.verifyToken, AuthMiddleware.isPengendara, PengendaraController.getDetailBengkel);

// Get Bengkel Review
router.post("/add-review-bengkel", AuthMiddleware.verifyToken, AuthMiddleware.isPengendara, PengendaraController.addReviewBengkel);
router.get("/get-detail-review-bengkel/:id", AuthMiddleware.verifyToken, AuthMiddleware.isPengendara, PengendaraController.getDetailReviewBengkel);

// Order Bengkel Service
router.post("/order-bengkel-service", AuthMiddleware.verifyToken, AuthMiddleware.isPengendara, PengendaraController.orderBengkelService);

// Pay Order
router.post("/pay-order", AuthMiddleware.verifyToken, AuthMiddleware.isPengendara, PengendaraController.payBengkelService);

// Cancel Order
router.post("/cancel-order/:orderId", AuthMiddleware.verifyToken, AuthMiddleware.isPengendara, PengendaraController.cancelOrder);

// Get Montir
router.get("/get-all-montir", AuthMiddleware.verifyToken, AuthMiddleware.isPengendara, AdminController.getAllMontir);
router.get("/get-detail-montir/:id", AuthMiddleware.verifyToken, AuthMiddleware.isPengendara, PengendaraController.getDetailBengkel);

// Get Montir Review
router.post("/add-review-montir", AuthMiddleware.verifyToken, AuthMiddleware.isPengendara, PengendaraController.addReviewMontir);
router.get("/get-detail-review-montir/:id", AuthMiddleware.verifyToken, AuthMiddleware.isPengendara, PengendaraController.getDetailReviewMontir);


export default router;