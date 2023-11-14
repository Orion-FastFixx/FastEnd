"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = require("../controllers/user.controller");
const router_1 = __importDefault(require("./router"));
router_1.default.post("/signup", user_controller_1.UserController.createUser);
router_1.default.get('/home', user_controller_1.UserController.createUser);
exports.default = router_1.default;
//# sourceMappingURL=user.routes.js.map