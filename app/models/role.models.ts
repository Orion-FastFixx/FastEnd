import { sequelize } from "../../db";
import { DataTypes } from 'sequelize';

const Role = sequelize.define("roles", {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },

});


export default Role;
