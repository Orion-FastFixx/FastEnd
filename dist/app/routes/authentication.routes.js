"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authentication_controller_1 = require("../controllers/authentication.controller");
const router_1 = __importDefault(require("./router"));
router_1.default.post("/signup", authentication_controller_1.AuthenticationController.signUp);
router_1.default.post("/signin", authentication_controller_1.AuthenticationController.signIn);
exports.default = router_1.default;
//# sourceMappingURL=authentication.routes.js.map