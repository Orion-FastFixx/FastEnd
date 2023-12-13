import { AuthenticationController } from "../controllers/authentication.controller";
import { Router } from "express";


const authRouter = Router();


authRouter.post("/signup", AuthenticationController.signUp);
authRouter.post("/signin", AuthenticationController.signIn);
authRouter.post("/signout", AuthenticationController.signOut);
authRouter.delete("/delete", AuthenticationController.deleteAccount);

export default authRouter;
