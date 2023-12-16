import { DataTypes } from 'sequelize';
import { sequelize } from "../../db";
import AdminBengkel from "./admin.bengkel.model";

const Bengkel = sequelize.define("bengkels", {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    nama_bengkel: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    phone_bengkel: {
        type: DataTypes.STRING(12),
        allowNull: false,
    },
    alamat: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    lokasi: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    deskripsi: {
        // TEXT DATA TYPE
        type: DataTypes.TEXT,
        allowNull: false,
    },
    jenis_bengkel: {
        type: DataTypes.ENUM,
        values: ['Bengkel Umum', 'Bengkel Resmi'],
        allowNull: false,
    },
    spesialisasi_bengkel: {
        type: DataTypes.ENUM,
        values: ['Bengkel Mobil', 'Bengkel Motor'],
        allowNull: false,
    },
    is_open: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    foto_url: {
        type: DataTypes.TEXT, // or STRING if length is sufficient
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
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: AdminBengkel, // This is a reference to another model
            key: 'id', // This is the column name of the referenced model
        },
        onDelete: 'CASCADE',
    },
});

export default Bengkel;