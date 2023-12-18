"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../db");
const sequelize_1 = require("sequelize");
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
    }
});
exports.default = Education;
//# sourceMappingURL=edukasi.models.js.map