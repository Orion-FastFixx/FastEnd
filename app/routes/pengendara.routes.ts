import { Router } from "express";
import { PengendaraController } from "../controllers/pengendara.controller";
import { AuthMiddleware } from "../middleware/auth";
import uploads from "../utils/multer";


const pengendaraRouter = Router();

// Get Bengkel
pengendaraRouter.get("/get-all-bengkel", AuthMiddleware.verifyToken, AuthMiddleware.isPengendara, PengendaraController.getAllBengkel);
pengendaraRouter.get("/get-detail-bengkel/:id", AuthMiddleware.verifyToken, AuthMiddleware.isPengendara, PengendaraController.getDetailBengkel);

// Get Bengkel Review
pengendaraRouter.post("/add-review-bengkel", AuthMiddleware.verifyToken, AuthMiddleware.isPengendara, PengendaraController.addReviewBengkel);
pengendaraRouter.get("/get-detail-review-bengkel/:id", AuthMiddleware.verifyToken, AuthMiddleware.isPengendara, PengendaraController.getDetailReviewBengkel);

// Order Bengkel Service
pengendaraRouter.post("/order-bengkel-service", AuthMiddleware.verifyToken, AuthMiddleware.isPengendara, PengendaraController.orderBengkelService);

// Get Montir
pengendaraRouter.get("/get-all-montir", AuthMiddleware.verifyToken, AuthMiddleware.isPengendara, PengendaraController.getAllMontir);
pengendaraRouter.get("/get-detail-montir/:id", AuthMiddleware.verifyToken, AuthMiddleware.isPengendara, PengendaraController.getDetailBengkel);

// Get Montir Review
pengendaraRouter.post("/add-review-montir", AuthMiddleware.verifyToken, AuthMiddleware.isPengendara, PengendaraController.addReviewMontir);
pengendaraRouter.get("/get-detail-review-montir/:id", AuthMiddleware.verifyToken, AuthMiddleware.isPengendara, PengendaraController.getDetailReviewMontir);

// Account Setting
pengendaraRouter.get("/get-all-kendaraan", AuthMiddleware.verifyToken, AuthMiddleware.isPengendara, PengendaraController.getAllKendaraan);
pengendaraRouter.post("/add-kendaraan", AuthMiddleware.verifyToken, AuthMiddleware.isPengendara, PengendaraController.addKendaraan);
pengendaraRouter.put("/update-kendaraan/:id", AuthMiddleware.verifyToken, AuthMiddleware.isPengendara, PengendaraController.updateKendaraan);
pengendaraRouter.delete("/delete-kendaraan/:id", AuthMiddleware.verifyToken, AuthMiddleware.isPengendara, PengendaraController.deleteKendaraan);
pengendaraRouter.put("/update-profile", uploads.single('foto'), AuthMiddleware.verifyToken, AuthMiddleware.isPengendara, PengendaraController.updateProfilePengendara);

// Order Montir Service
pengendaraRouter.post("/order-montir-service", AuthMiddleware.verifyToken, AuthMiddleware.isPengendara, PengendaraController.orderMontirService);

// Pay Order
pengendaraRouter.post("/pay-order", AuthMiddleware.verifyToken, AuthMiddleware.isPengendara, PengendaraController.payOrderService);

// Cancel Order
pengendaraRouter.post("/cancel-order/:orderId", AuthMiddleware.verifyToken, AuthMiddleware.isPengendara, PengendaraController.cancelOrder);

// Education
pengendaraRouter.get("/get-all-education", AuthMiddleware.verifyToken, AuthMiddleware.isPengendara, PengendaraController.getAllEducation);
pengendaraRouter.get("/get-detail-education/:id", AuthMiddleware.verifyToken, AuthMiddleware.isPengendara, PengendaraController.getDetailEducation);


export default pengendaraRouter;