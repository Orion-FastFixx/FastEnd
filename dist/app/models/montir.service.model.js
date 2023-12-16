"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../db");
const sequelize_1 = require("sequelize");
const montir_models_1 = __importDefault(require("./montir.models"));
const service_model_1 = __importDefault(require("./service.model"));
const MontirService = db_1.sequelize.define("montir_services", {
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    harga: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    // have relation to bengkel and service
    montir_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: montir_models_1.default,
            key: 'id', // This is the column name of the referenced model
        }
    },
    service_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: service_model_1.default,
            key: 'id', // This is the column name of the referenced model
        }
    },
});
exports.default = MontirService;
//# sourceMappingURL=montir.service.model.js.map