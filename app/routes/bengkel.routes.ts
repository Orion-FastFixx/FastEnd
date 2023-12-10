import router from "./router";
import { BengkelController } from "../controllers/bengkel.controller";
import { AuthMiddleware } from "../middleware/auth";
import uploads from "../utils/multer";


router.post("/create-bengkel", uploads.array('foto_url'), AuthMiddleware.verifyToken, AuthMiddleware.isAdminBengkel, BengkelController.createBengkel);
router.post("/create-layanan", AuthMiddleware.verifyToken, AuthMiddleware.isAdminBengkel, BengkelController.createLayanan);
router.get("/get-bengkel-order-service", AuthMiddleware.verifyToken, AuthMiddleware.isAdminBengkel, BengkelController.getBengkelOrderService);
router.post("/order/:orderId/accept", AuthMiddleware.verifyToken, AuthMiddleware.isAdminBengkel, BengkelController.acceptOrder);
router.post("/order/:orderId/cancel", AuthMiddleware.verifyToken, AuthMiddleware.isAdminBengkel, BengkelController.cancelOrder);
router.post("/order/:orderId/completed", AuthMiddleware.verifyToken, AuthMiddleware.isAdminBengkel, BengkelController.completedOrder);

export default router;