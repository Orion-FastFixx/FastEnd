"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const initConstantValue_controller_1 = require("../controllers/initConstantValue.controller");
const express_1 = require("express");
const initRouter = (0, express_1.Router)();
initRouter.post("/init-roles", initConstantValue_controller_1.initializeContantValue.initRole);
initRouter.post("/init-order-status", initConstantValue_controller_1.initializeContantValue.initOrderStatus);
initRouter.post("/init-payment-status", initConstantValue_controller_1.initializeContantValue.initPaymentStatus);
initRouter.post("/init-payment-method", initConstantValue_controller_1.initializeContantValue.initPaymentMethod);
exports.default = initRouter;
//# sourceMappingURL=initConstantValue.routes.js.map