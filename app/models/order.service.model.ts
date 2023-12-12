import { sequelize } from "../../db";
import { DataTypes } from 'sequelize';
import Order from "./order.model";
import Service from "./service.model";

const OrderService = sequelize.define("order_services", {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    order_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: Order,
            key: "id"
        },
        onDelete: 'CASCADE',
    },
    service_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: Service,
            key: "id"
        },
        onDelete: 'CASCADE',
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
});

export default OrderService;