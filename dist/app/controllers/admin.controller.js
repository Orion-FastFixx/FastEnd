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
exports.AdminController = void 0;
const user_models_1 = __importDefault(require("../models/user.models"));
const montir_rating_model_1 = __importDefault(require("../models/montir.rating.model"));
const db_1 = require("../../db");
exports.AdminController = {
    getAllMontir(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const montirs = yield user_models_1.default.findAll({
                    where: { role_id: 4 },
                    include: [
                        {
                            model: montir_rating_model_1.default,
                            as: 'rating',
                            attributes: [
                                [db_1.sequelize.fn('ROUND', db_1.sequelize.fn('AVG', db_1.sequelize.col('montir_rating')), 1), 'average_rating'],
                                [db_1.sequelize.fn('COUNT', db_1.sequelize.col('review')), 'review_count']
                            ],
                        }
                    ],
                    attributes: { exclude: ['user_id', 'createdAt', 'updatedAt'] },
                    group: ['montirs.id', 'services.id']
                });
                res.status(200).json({
                    message: "Success get all montir",
                    data: montirs
                });
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    },
};
//# sourceMappingURL=admin.controller.js.map