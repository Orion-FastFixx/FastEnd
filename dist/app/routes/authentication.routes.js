"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authentication_controller_1 = require("../controllers/authentication.controller");
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const authRouter = (0, express_1.Router)();
authRouter.post("/signup", authentication_controller_1.AuthenticationController.signUp);
authRouter.post("/signin", authentication_controller_1.AuthenticationController.signIn);
authRouter.post("/generate-new-token", authentication_controller_1.AuthenticationController.generateAccessToken);
authRouter.post("/signout", auth_1.AuthMiddleware.verifyToken, authentication_controller_1.AuthenticationController.signOut);
authRouter.put("/update-password", auth_1.AuthMiddleware.verifyToken, authentication_controller_1.AuthenticationController.updatePassword);
authRouter.delete("/delete", auth_1.AuthMiddleware.verifyToken, authentication_controller_1.AuthenticationController.deleteAccount);
exports.default = authRouter;
//# sourceMappingURL=authentication.routes.js.map