"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const router_1 = __importDefault(require("./router"));
const initConstantValue_routes_1 = __importDefault(require("./initConstantValue.routes"));
const authentication_routes_1 = __importDefault(require("./authentication.routes"));
const admin_routes_1 = __importDefault(require("./admin.routes"));
const bengkel_routes_1 = __importDefault(require("./bengkel.routes"));
const montir_routes_1 = __importDefault(require("./montir.routes"));
const pengendara_routes_1 = __importDefault(require("./pengendara.routes"));
router_1.default.use('/admin', admin_routes_1.default);
router_1.default.use('/auth', authentication_routes_1.default);
router_1.default.use('/init-constant-value', initConstantValue_routes_1.default);
router_1.default.use('/bengkel', bengkel_routes_1.default);
router_1.default.use('/montir', montir_routes_1.default);
router_1.default.use('/pengendara', pengendara_routes_1.default);
exports.routes = router_1.default;
//# sourceMappingURL=index.routes.js.map