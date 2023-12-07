import { sequelize } from "../../db";
import { DataTypes } from 'sequelize';

const Service = sequelize.define("services", {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    layanan: {
        type: DataTypes.STRING(30),
        allowNull: true,
    }
});

export default Service;