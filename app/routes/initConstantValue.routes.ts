import { initializeContantValue } from "../controllers/initConstantValue.controller";
import router from "./router";

router.post("/init-roles", initializeContantValue.initRole);
router.post("/init-order-status", initializeContantValue.initOrderStatus);
router.post("/init-payment-status", initializeContantValue.initPaymentStatus);

export default router;