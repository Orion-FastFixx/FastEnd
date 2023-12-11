import router from "./router";
import { MontirController } from "../controllers/montir.controller";
import { AuthMiddleware } from "../middleware/auth";
import uploads from "../utils/multer";

router.post("/create-layanan-montir", AuthMiddleware.verifyToken, AuthMiddleware.isMontir, MontirController.createLayanan);
router.get("/get-montir-order-service", AuthMiddleware.verifyToken, AuthMiddleware.isMontir, MontirController.getMontirOrderService);
router.post("/order-montir/:orderId/accept", AuthMiddleware.verifyToken, AuthMiddleware.isMontir, MontirController.acceptOrder);
router.post("/order-montir/:orderId/cancel", AuthMiddleware.verifyToken, AuthMiddleware.isMontir, MontirController.cancelOrder);
router.post("/order-montir/:orderId/completed", AuthMiddleware.verifyToken, AuthMiddleware.isMontir, MontirController.completedOrder);

export default router;