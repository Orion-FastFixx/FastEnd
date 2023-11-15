"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const edukasi_controller_1 = require("../controllers/edukasi.controller");
const router_1 = __importDefault(require("./router"));
router_1.default.get('/edukasi', edukasi_controller_1.EdukasiController.find);
router_1.default.get('/edukasi/:id', edukasi_controller_1.EdukasiControllerById.findId);
router_1.default.post('/edukasi', edukasi_controller_1.saveContent.createKonten);
router_1.default.patch('/edukasi/:id', edukasi_controller_1.updateContent.updateKonten);
router_1.default.delete('/edukasi/:id', edukasi_controller_1.deleteContent.deleteKonten);
exports.default = router_1.default;
//# sourceMappingURL=edukasi.routes.js.map