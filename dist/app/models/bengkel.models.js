"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../db");
const sequelize_1 = require("sequelize");
const user_models_1 = __importDefault(require("./user.models"));
const rating_models_1 = __importDefault(require("./rating.models"));
const Bengkel = db_1.sequelize.define("bengkels", {
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    nama_bengkel: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
    phone_bengkel: {
        type: sequelize_1.DataTypes.STRING(12),
        allowNull: false,
    },
    alamat: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
    lokasi: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
    deskripsi: {
        // TEXT DATA TYPE
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    jenis_bengkel: {
        type: sequelize_1.DataTypes.ENUM,
        values: ['Bengkel Umum', 'Bengkel Resmi'],
        allowNull: false,
    },
    is_open: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    foto: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    pemilik_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: user_models_1.default,
            key: 'id', // This is the column name of the referenced model
        }
    },
    rating_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: rating_models_1.default,
            key: 'id', // This is the column name of the referenced model
        }
    }
});
exports.default = Bengkel;
//# sourceMappingURL=bengkel.models.js.map