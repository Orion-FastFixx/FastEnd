import { sequelize } from "../../db";
import { DataTypes } from 'sequelize';

const Rating = sequelize.define("ratings", {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    review: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
});

export default Rating;