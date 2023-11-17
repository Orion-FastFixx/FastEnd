import { initializeRoles } from "../controllers/initRole.controller";
import router from "./router";

router.post("/init-roles", initializeRoles);

export default router;