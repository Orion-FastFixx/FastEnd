import { AdminController } from "../controllers/admin.controller";
import { AuthMiddleware } from "../middleware/auth";
import router from "./router";


router.get("/list-montir", AuthMiddleware.verifyToken, AuthMiddleware.isAdmin, AdminController.getAllMontir);

export default router;
