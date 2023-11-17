"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../db");
const sequelize_1 = require("sequelize");
const user_models_1 = __importDefault(require("./user.models"));
const kendaraan_models_1 = __importDefault(require("./kendaraan.models"));
const Pengendara = db_1.sequelize.define("pengendaras", {
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    nama: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: true,
    },
    phone: {
        type: sequelize_1.DataTypes.STRING(12),
        allowNull: true,
    },
    lokasi: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: true,
    },
    kendaraan_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        references: {
            model: kendaraan_models_1.default,
            key: 'id', // This is the column name of the referenced model
        }
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: user_models_1.default,
            key: 'id', // This is the column name of the referenced model
        }
    }
});
exports.default = Pengendara;
//# sourceMappingURL=pengendara.models.js.map