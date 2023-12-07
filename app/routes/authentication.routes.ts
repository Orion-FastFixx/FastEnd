import { AuthenticationController } from "../controllers/authentication.controller";
import router from "./router";


router.post("/signup", AuthenticationController.signUp);
router.post("/signin", AuthenticationController.signIn);
router.post("/signout", AuthenticationController.signOut);

export default router;
