import { AdminController } from "../controllers/admin.controller";
import { AuthMiddleware } from "../middleware/auth";
import { Router } from "express";
import uploads from "../utils/multer";


const adminRouter = Router();

adminRouter.get("/list-user", AuthMiddleware.verifyToken, AuthMiddleware.isAdmin, AdminController.getAllUser);
adminRouter.get("/list-education", AuthMiddleware.verifyToken, AuthMiddleware.isAdmin, AdminController.getAllContent);
adminRouter.post("/create-education", uploads.array('foto_url'), AuthMiddleware.verifyToken, AuthMiddleware.isAdmin, AdminController.createEducation,);
adminRouter.post("/edit-education", uploads.array('foto_url'), AuthMiddleware.verifyToken, AuthMiddleware.isAdmin, AdminController.updateContent,);
adminRouter.post("/delete-education", AuthMiddleware.verifyToken, AuthMiddleware.isAdmin, AdminController.deleteContent,);


export default adminRouter;
