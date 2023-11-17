import { sequelize } from "../../db";
import { DataTypes } from 'sequelize';
import User from "./user.models";
import Rating from "./rating.models";

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
    is_open: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    foto: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    pemilik_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: User, // This is a reference to another model
            key: 'id', // This is the column name of the referenced model
        }
    },
    rating_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: Rating, // This is a reference to another model
            key: 'id', // This is the column name of the referenced model
        }
    }
});

export default Bengkel;