import { sequelize } from "../../db";
import { DataTypes } from 'sequelize';

const Payment = sequelize.define("payments", {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    }
});