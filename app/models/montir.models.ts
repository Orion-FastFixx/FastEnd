import { sequelize } from "../../db";
import { DataTypes } from 'sequelize';
import User from "./user.models";

const Montir = sequelize.define("montirs", {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    nama: {
        type: DataTypes.STRING(30),
        allowNull: true,
    },
    phone: {
        type: DataTypes.STRING(12),
        allowNull: true,
    },
    deskripsi: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    jenis_montir: {
        type: DataTypes.ENUM,
        values: ['Montir Mobil', 'Montir Motor'],
        allowNull: false,
    },
    pengalaman: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    foto_url: {
        type: DataTypes.TEXT,
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
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    user_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: User, // This is a reference to another model
            key: 'id', // This is the column name of the referenced model
        },
        onDelete: 'CASCADE',
    }
});

export default Montir;