import { UserController } from "../controllers/user.controller";
import router from "./router";

router.post("/signup", UserController.createUser);

router.get('/home', UserController.createUser )

export default router;