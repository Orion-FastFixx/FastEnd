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
exports.initializeRoles = void 0;
const role_models_1 = __importDefault(require("../models/role.models"));
const db_1 = require("../../db");
const defaultRoles = ["Admin", "Pengendara", "Admin Bengkel", "Montir"];
const initializeRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transaction = yield db_1.sequelize.transaction();
        let results = [];
        for (const roleName of defaultRoles) {
            const [role, created] = yield role_models_1.default.findOrCreate({
                where: { name: roleName },
                defaults: { name: roleName },
                transaction,
            });
            results.push({
                roleName: roleName,
                status: created ? 'created' : 'already exists',
                roleDetails: role
            });
        }
        yield transaction.commit();
        return res.status(200).json({
            message: "Success initialize roles",
            data: results
        });
    }
    catch (error) {
        console.error("Error initializing roles:", error);
        return res.status(500).json({ message: error.message });
    }
});
exports.initializeRoles = initializeRoles;
//# sourceMappingURL=initRole.controller.js.map