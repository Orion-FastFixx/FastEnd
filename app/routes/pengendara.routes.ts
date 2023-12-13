import { Router } from "express";
import { PengendaraController } from "../controllers/pengendara.controller";
import { AuthMiddleware } from "../middleware/auth";

const pengendaraRouter = Router();

// Get Bengkel
pengendaraRouter.get("/get-all-bengkel", AuthMiddleware.verifyToken, AuthMiddleware.isPengendara, PengendaraController.getAllBengkel);
pengendaraRouter.get("/get-detail-bengkel/:id", AuthMiddleware.verifyToken, AuthMiddleware.isPengendara, PengendaraController.getDetailBengkel);

// Get Bengkel Review
pengendaraRouter.post("/add-review-bengkel", AuthMiddleware.verifyToken, AuthMiddleware.isPengendara, PengendaraController.addReviewBengkel);
pengendaraRouter.get("/get-detail-review-bengkel/:id", AuthMiddleware.verifyToken, AuthMiddleware.isPengendara, PengendaraController.getDetailReviewBengkel);

// Order Bengkel Service
pengendaraRouter.post("/order-bengkel-service", AuthMiddleware.verifyToken, AuthMiddleware.isPengendara, PengendaraController.orderBengkelService);

// Pay Order
pengendaraRouter.post("/pay-order", AuthMiddleware.verifyToken, AuthMiddleware.isPengendara, PengendaraController.payBengkelService);

// Cancel Order
pengendaraRouter.post("/cancel-order/:orderId", AuthMiddleware.verifyToken, AuthMiddleware.isPengendara, PengendaraController.cancelOrder);

// Get Montir Review
pengendaraRouter.post("/add-review-montir", AuthMiddleware.verifyToken, AuthMiddleware.isPengendara, PengendaraController.addReviewMontir);
pengendaraRouter.get("/get-detail-review-montir/:id", AuthMiddleware.verifyToken, AuthMiddleware.isPengendara, PengendaraController.getDetailReviewMontir);

// Kendaraan
pengendaraRouter.get("/get-all-kendaraan", AuthMiddleware.verifyToken, AuthMiddleware.isPengendara, PengendaraController.getAllKendaraan);
pengendaraRouter.post("/add-kendaraan", AuthMiddleware.verifyToken, AuthMiddleware.isPengendara, PengendaraController.addKendaraan);
pengendaraRouter.put("/update-kendaraan/:id", AuthMiddleware.verifyToken, AuthMiddleware.isPengendara, PengendaraController.updateKendaraan);
pengendaraRouter.delete("/delete-kendaraan/:id", AuthMiddleware.verifyToken, AuthMiddleware.isPengendara, PengendaraController.deleteKendaraan);


export default pengendaraRouter;