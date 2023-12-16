import { sequelize } from "../../db";
import { DataTypes } from 'sequelize';
import Role from "./role.models";

const User = sequelize.define("users", {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        role_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: Role, // This is a reference to another model
                key: 'id', // This is the column name of the referenced model
            }
        },
});

export default User;