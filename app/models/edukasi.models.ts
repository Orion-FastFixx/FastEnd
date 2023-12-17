import { sequelize } from "../../db";
import { DataTypes } from 'sequelize';
import Admin from "./admin.models";

const Education = sequelize.define("educations", {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    judul: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    jenis_kendaraan: {
        type: DataTypes.ENUM,
        values: ['Mobil', 'Motor'],
        allowNull: false,
    },
    kategori: {
        type: DataTypes.ENUM,
        values: ['Tips', 'Interior', 'Exterior', 'Mesin'],
        allowNull: false,
    },
    sub_judul: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    isi_konten: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    foto_url: {
        type: DataTypes.TEXT,
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

export default Education;