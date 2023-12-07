"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PengendaraController = void 0;
const bengkel_models_1 = __importDefault(require("../models/bengkel.models"));
const service_model_1 = __importDefault(require("../models/service.model"));
exports.PengendaraController = {
    getAllBengkel(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bengkel = yield bengkel_models_1.default.findAll({
                    include: [{
                            model: service_model_1.default,
                            as: 'services',
                            attributes: { exclude: ['createdAt', 'updatedAt'] },
                            through: {
                                attributes: ['harga'],
                                as: 'harga_layanan'
                            }
                        }],
                    attributes: { exclude: ['createdAt', 'updatedAt'] }
                });
                return res.status(200).json({
                    message: "Success get all bengkel",
                    data: bengkel
                });
            }
            catch (error) {
                return res.status(500).json({ message: error.message || "Internal Server Error" });
            }
        });
    },
};
//# sourceMappingURL=pengendara.controller.js.map