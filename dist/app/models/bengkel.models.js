"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../../db");
const admin_bengkel_model_1 = __importDefault(require("./admin.bengkel.model"));
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
    spesialisasi_bengkel: {
        type: sequelize_1.DataTypes.ENUM,
        values: ['Bengkel Mobil', 'Bengkel Motor'],
        allowNull: false,
    },
    is_open: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
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
    pemilik_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: admin_bengkel_model_1.default,
            key: 'id', // This is the column name of the referenced model
        },
        onDelete: 'CASCADE',
    },
});
exports.default = Bengkel;
//# sourceMappingURL=bengkel.models.js.map