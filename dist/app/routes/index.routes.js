"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const router_1 = __importDefault(require("./router"));
const initRole_routes_1 = __importDefault(require("./initRole.routes"));
const authentication_routes_1 = __importDefault(require("./authentication.routes"));
const admin_routes_1 = __importDefault(require("./admin.routes"));
router_1.default.use('/admin', admin_routes_1.default);
router_1.default.use('/auth', authentication_routes_1.default);
router_1.default.use('/init-roles', initRole_routes_1.default);
exports.routes = router_1.default;
//# sourceMappingURL=index.routes.js.map