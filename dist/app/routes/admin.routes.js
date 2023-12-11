"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin_controller_1 = require("../controllers/admin.controller");
const auth_1 = require("../middleware/auth");
const express_1 = require("express");
const adminRouter = (0, express_1.Router)();
adminRouter.get("/list-montir", auth_1.AuthMiddleware.verifyToken, auth_1.AuthMiddleware.isAdmin, admin_controller_1.AdminController.getAllMontir);
exports.default = adminRouter;
//# sourceMappingURL=admin.routes.js.map