import { sequelize } from "../../db";
import { DataTypes } from 'sequelize';
import User from "./user.models";

const Admin = sequelize.define("admins", {
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

export default Admin;