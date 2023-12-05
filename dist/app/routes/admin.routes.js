"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const admin_controller_1 = require("../controllers/admin.controller");
const auth_1 = require("../middleware/auth");
const router_1 = __importDefault(require("./router"));
router_1.default.get("/list-montir", auth_1.AuthMiddleware.verifyToken, auth_1.AuthMiddleware.isAdmin, admin_controller_1.AdminController.getAllMontir);
exports.default = router_1.default;
//# sourceMappingURL=admin.routes.js.map