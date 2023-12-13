import { Router } from "express";
import { BengkelController } from "../controllers/bengkel.controller";
import { AuthMiddleware } from "../middleware/auth";
import uploads from "../utils/multer";


const bengkelRouter = Router();

bengkelRouter.post("/create-bengkel", uploads.array('foto_url'), AuthMiddleware.verifyToken, AuthMiddleware.isAdminBengkel, BengkelController.createBengkel);
bengkelRouter.post("/create-layanan", AuthMiddleware.verifyToken, AuthMiddleware.isAdminBengkel, BengkelController.createLayanan);
bengkelRouter.get("/get-bengkel-order-service", AuthMiddleware.verifyToken, AuthMiddleware.isAdminBengkel, BengkelController.getBengkelOrderService);
bengkelRouter.get("/get-detail-bengkel-order-service/:orderId", AuthMiddleware.verifyToken, AuthMiddleware.isAdminBengkel, BengkelController.getDetailBengkelOrderService);
bengkelRouter.get("/get-completed-bengkel-order-service", AuthMiddleware.verifyToken, AuthMiddleware.isAdminBengkel, BengkelController.getCompletedBengkelOrderService);
bengkelRouter.get("/get-cancelled-bengkel-order-service", AuthMiddleware.verifyToken, AuthMiddleware.isAdminBengkel, BengkelController.getCanceledBengkelOrderService);


bengkelRouter.post("/order/:orderId/accept", AuthMiddleware.verifyToken, AuthMiddleware.isAdminBengkel, BengkelController.acceptOrder);
bengkelRouter.post("/order/:orderId/cancel", AuthMiddleware.verifyToken, AuthMiddleware.isAdminBengkel, BengkelController.cancelOrder);
bengkelRouter.post("/order/:orderId/completed", AuthMiddleware.verifyToken, AuthMiddleware.isAdminBengkel, BengkelController.completedOrder);

export default bengkelRouter;