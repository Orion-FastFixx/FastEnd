import { initializeContantValue } from "../controllers/initConstantValue.controller";
import { Router } from "express";

const initRouter = Router();

initRouter.post("/init-roles", initializeContantValue.initRole);
initRouter.post("/init-order-status", initializeContantValue.initOrderStatus);
initRouter.post("/init-payment-status", initializeContantValue.initPaymentStatus);
initRouter.post("/init-payment-method", initializeContantValue.initPaymentMethod);

export default initRouter;