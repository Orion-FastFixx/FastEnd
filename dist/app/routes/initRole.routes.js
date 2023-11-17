"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const initRole_controller_1 = require("../controllers/initRole.controller");
const router_1 = __importDefault(require("./router"));
router_1.default.post("/init-roles", initRole_controller_1.initializeRoles);
exports.default = router_1.default;
//# sourceMappingURL=initRole.routes.js.map