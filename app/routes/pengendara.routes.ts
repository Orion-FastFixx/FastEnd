import router from "./router";
import { PengendaraController } from "../controllers/pengendara.controller";
import { AuthMiddleware } from "../middleware/auth";

router.get("/get-all-bengkel", AuthMiddleware.verifyToken, AuthMiddleware.isPengendara, PengendaraController.getAllBengkel);
router.get("/get-detail-bengkel/:id", AuthMiddleware.verifyToken, AuthMiddleware.isPengendara, PengendaraController.getDetailBengkel);
router.get("/get-detail-review-bengkel/:id", AuthMiddleware.verifyToken, AuthMiddleware.isPengendara, PengendaraController.getDetailReviewBengkel);
router.post("/add-review-bengkel", AuthMiddleware.verifyToken, AuthMiddleware.isPengendara, PengendaraController.addReviewBengkel);

export default router;