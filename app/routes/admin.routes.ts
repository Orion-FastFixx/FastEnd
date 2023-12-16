import { AdminController } from "../controllers/admin.controller";
import { AuthMiddleware } from "../middleware/auth";
import { Router } from "express";

const adminRouter = Router();


adminRouter.get("/list-montir", AuthMiddleware.verifyToken, AuthMiddleware.isAdmin, AdminController.getAllMontir);

export default adminRouter;
