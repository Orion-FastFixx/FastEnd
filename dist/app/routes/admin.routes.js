"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const admin_controller_1 = require("../controllers/admin.controller");
const auth_1 = require("../middleware/auth");
const express_1 = require("express");
const multer_1 = __importDefault(require("../utils/multer"));
const adminRouter = (0, express_1.Router)();
adminRouter.get("/list-montir", auth_1.AuthMiddleware.verifyToken, auth_1.AuthMiddleware.isAdmin, admin_controller_1.AdminController.getAllMontir);
adminRouter.get("/list-bengkel", auth_1.AuthMiddleware.verifyToken, auth_1.AuthMiddleware.isAdmin, admin_controller_1.AdminController.getAllBengkel);
adminRouter.get("/list-education", auth_1.AuthMiddleware.verifyToken, auth_1.AuthMiddleware.isAdmin, admin_controller_1.AdminController.getAllContent);
adminRouter.post("/create-education", multer_1.default.array('foto_url'), auth_1.AuthMiddleware.verifyToken, auth_1.AuthMiddleware.isAdmin, admin_controller_1.AdminController.createEducation);
adminRouter.put("/edit-education/:id", multer_1.default.array('foto_url'), auth_1.AuthMiddleware.verifyToken, auth_1.AuthMiddleware.isAdmin, admin_controller_1.AdminController.updateContent);
adminRouter.post("/delete-education", auth_1.AuthMiddleware.verifyToken, auth_1.AuthMiddleware.isAdmin, admin_controller_1.AdminController.deleteContent);
exports.default = adminRouter;
//# sourceMappingURL=admin.routes.js.map