import { AuthenticationController } from "../controllers/authentication.controller";
import { Router } from "express";
import { AuthMiddleware } from "../middleware/auth";


const authRouter = Router();


authRouter.post("/signup", AuthenticationController.signUp);
authRouter.post("/signin", AuthenticationController.signIn);
authRouter.post("/signout", AuthMiddleware.verifyToken, AuthenticationController.signOut);
authRouter.put("/update-password", AuthMiddleware.verifyToken, AuthenticationController.updatePassword);
authRouter.delete("/delete", AuthMiddleware.verifyToken, AuthenticationController.deleteAccount);

export default authRouter;
