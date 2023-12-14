import { AdminController } from "../controllers/admin.controller";
import { EducationController } from "../controllers/edukasi.controller";
import { AuthMiddleware } from "../middleware/auth";
import { Router } from "express";
import uploads from "../utils/multer";


const adminRouter = Router();

adminRouter.get("/list-user", AuthMiddleware.verifyToken, AuthMiddleware.isAdmin, AdminController.getAllUser);
adminRouter.post("/create-education",  AuthMiddleware.verifyToken, AuthMiddleware.isAdmin, EducationController.createEducation, uploads.array('foto_url'),);

export default adminRouter;
