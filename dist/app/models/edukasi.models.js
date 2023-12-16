"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../db");
const sequelize_1 = require("sequelize");
const admin_models_1 = __importDefault(require("./admin.models"));
const Education = db_1.sequelize.define("educations", {
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    judul: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
    jenis_kendaraan: {
        type: sequelize_1.DataTypes.ENUM,
        values: ['Mobil', 'Motor'],
        allowNull: false,
    },
    kategori: {
        type: sequelize_1.DataTypes.ENUM,
        values: ['Tips', 'Interior', 'Exterior', 'Mesin'],
        allowNull: false,
    },
    sub_judul: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
    isi_konten: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    foto_url: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
        get() {
            const rawValue = this.getDataValue('foto_url');
            return rawValue ? JSON.parse(rawValue) : [];
        },
        set(value) {
            this.setDataValue('foto_url', JSON.stringify(value));
        }
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: admin_models_1.default,
            key: 'id', // This is the column name of the referenced model
        },
        onDelete: 'CASCADE',
    }
});
exports.default = Education;
//# sourceMappingURL=edukasi.models.js.map