"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authentication_controller_1 = require("../controllers/authentication.controller");
const express_1 = require("express");
const authRouter = (0, express_1.Router)();
authRouter.post("/signup", authentication_controller_1.AuthenticationController.signUp);
authRouter.post("/signin", authentication_controller_1.AuthenticationController.signIn);
authRouter.post("/signout", authentication_controller_1.AuthenticationController.signOut);
exports.default = authRouter;
//# sourceMappingURL=authentication.routes.js.map