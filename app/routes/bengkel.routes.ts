import router from "./router";
import { BengkelController } from "../controllers/bengkel.controller";
import { AuthMiddleware } from "../middleware/auth";


router.post("/create-bengkel", AuthMiddleware.verifyToken, AuthMiddleware.isAdminBengkel, BengkelController.createBengkel);
router.post("/create-layanan", AuthMiddleware.verifyToken, AuthMiddleware.isAdminBengkel, BengkelController.createLayanan);

export default router;