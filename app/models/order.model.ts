import { sequelize } from "../../db";
import { DataTypes } from 'sequelize';
import OrderStatus from "./order.status.model";
import Pengendara from "./pengendara.models";
import Bengkel from "./bengkel.models";
import Montir from "./montir.models";

const Order = sequelize.define("orders", {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    pengendara_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        references: {
            model: Pengendara,
            key: "id"
        }
    },
    bengkel_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        references: {
            model: Bengkel,
            key: "id"
        }
    },
    montir_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        references: {
            model: Montir,
            key: "id"
        }
    },
    total_harga: {
        type: DataTypes.DECIMAL(10, 2), // Adjust the precision as needed
        allowNull: false,
        defaultValue: 0.00
    },
    order_status_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        references: {
            model: OrderStatus,
            key: "id"
        }
    },
});

export default Order;