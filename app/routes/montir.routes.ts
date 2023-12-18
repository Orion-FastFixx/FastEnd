import { Router } from "express";
import { MontirController } from "../controllers/montir.controller";
import { AuthMiddleware } from "../middleware/auth";
import uploads from "../utils/multer";

const montirRouter = Router();

montirRouter.put("/update-montir/:montirId", AuthMiddleware.verifyToken, AuthMiddleware.isMontir, MontirController.updateMontir);
montirRouter.post("/create-layanan-montir", AuthMiddleware.verifyToken, AuthMiddleware.isMontir, MontirController.createLayanan);
montirRouter.get("/get-montir-order-service", AuthMiddleware.verifyToken, AuthMiddleware.isMontir, MontirController.getMontirOrderService);
montirRouter.get("/get-detail-montir-order-service/:orderId", AuthMiddleware.verifyToken, AuthMiddleware.isMontir, MontirController.getDetailMontirOrderService);
montirRouter.get("/get-completed-montir-order-service", AuthMiddleware.verifyToken, AuthMiddleware.isMontir, MontirController.getCompletedMontirOrderService);
montirRouter.get("/get-cancelled-montir-order-service", AuthMiddleware.verifyToken, AuthMiddleware.isMontir, MontirController.getCanceledMontirOrderService);
montirRouter.post("/order-montir/:orderId/accept", AuthMiddleware.verifyToken, AuthMiddleware.isMontir, MontirController.acceptMontirOrderService);
montirRouter.post("/order-montir/:orderId/cancel", AuthMiddleware.verifyToken, AuthMiddleware.isMontir, MontirController.cancelMontirOrderService);
montirRouter.post("/order-montir/:orderId/completed", AuthMiddleware.verifyToken, AuthMiddleware.isMontir, MontirController.completedMontirOrderService);

export default montirRouter;