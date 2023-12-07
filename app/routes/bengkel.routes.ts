import router from "./router";
import { BengkelController } from "../controllers/bengkel.controller";
import { AuthMiddleware } from "../middleware/auth";
import uploads from "../utils/multer";


router.post("/create-bengkel", uploads.array('foto_url'), AuthMiddleware.verifyToken, AuthMiddleware.isAdminBengkel, BengkelController.createBengkel);
router.post("/create-layanan", AuthMiddleware.verifyToken, AuthMiddleware.isAdminBengkel, BengkelController.createLayanan);

export default router;