import { DataTypes } from 'sequelize';
import { sequelize } from "../../db";

const RefreshToken = sequelize.define('refresh_tokens', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    token: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
});


export default RefreshToken;