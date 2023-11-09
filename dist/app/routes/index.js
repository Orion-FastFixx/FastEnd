"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_routes_1 = __importDefault(require("./user.routes"));
const user_routes_2 = __importDefault(require("./user.routes"));
user_routes_1.default.use('/user', user_routes_2.default);
//# sourceMappingURL=index.js.map