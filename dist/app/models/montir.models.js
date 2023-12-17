"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../db");
const sequelize_1 = require("sequelize");
const user_models_1 = __importDefault(require("./user.models"));
const Montir = db_1.sequelize.define("montirs", {
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
    deskripsi: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    jenis_montir: {
        type: sequelize_1.DataTypes.ENUM,
        values: ['Montir Mobil', 'Montir Motor'],
        allowNull: false,
    },
    pengalaman: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: true,
    },
    foto_url: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
        get() {
            const rawValue = this.getDataValue('foto_url');
            return rawValue ? JSON.parse(rawValue) : [];
        },
        set(value) {
            this.setDataValue('foto_url', JSON.stringify(value));
        }
    },
    is_available: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: user_models_1.default,
            key: 'id', // This is the column name of the referenced model
        },
        onDelete: 'CASCADE',
    }
});
exports.default = Montir;
//# sourceMappingURL=montir.models.js.map