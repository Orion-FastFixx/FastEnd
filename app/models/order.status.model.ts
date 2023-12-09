import { sequelize } from "../../db";
import { DataTypes } from 'sequelize';

const OrderStatus = sequelize.define("order_statuses", {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    status: {
        type: DataTypes.STRING(30),
        allowNull: true,
    },
});

export default OrderStatus; 