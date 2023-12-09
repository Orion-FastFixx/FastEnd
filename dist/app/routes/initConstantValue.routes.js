"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const initConstantValue_controller_1 = require("../controllers/initConstantValue.controller");
const router_1 = __importDefault(require("./router"));
router_1.default.post("/init-roles", initConstantValue_controller_1.initializeContantValue.initRole);
router_1.default.post("/init-order-status", initConstantValue_controller_1.initializeContantValue.initOrderStatus);
router_1.default.post("/init-payment-status", initConstantValue_controller_1.initializeContantValue.initPaymentStatus);
exports.default = router_1.default;
//# sourceMappingURL=initConstantValue.routes.js.map