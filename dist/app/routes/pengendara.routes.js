"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = __importDefault(require("./router"));
const pengendara_controller_1 = require("../controllers/pengendara.controller");
const auth_1 = require("../middleware/auth");
router_1.default.get("/get-all-bengkel", auth_1.AuthMiddleware.verifyToken, auth_1.AuthMiddleware.isPengendara, pengendara_controller_1.PengendaraController.getAllBengkel);
exports.default = router_1.default;
//# sourceMappingURL=pengendara.routes.js.map