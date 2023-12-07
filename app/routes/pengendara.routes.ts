import router from "./router";
import { PengendaraController } from "../controllers/pengendara.controller";
import { AuthMiddleware } from "../middleware/auth";

router.get("/get-all-bengkel", AuthMiddleware.verifyToken, AuthMiddleware.isPengendara, PengendaraController.getAllBengkel);

export default router;