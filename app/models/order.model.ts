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
    additional_info: {
        type: DataTypes.JSON, // Assuming you're storing raw JSON
        allowNull: true,
        get() {
            const rawValue = this.getDataValue('additional_info');
            try {
                return JSON.parse(rawValue);
            } catch (error) {
                return rawValue; // or return {} or null based on your preference
            }
        }
    },
    pengendara_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        references: {
            model: Pengendara,
            key: "id"
        },
        onDelete: 'CASCADE',
    },
    bengkel_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        references: {
            model: Bengkel,
            key: "id"
        },
        onDelete: 'CASCADE',
    },
    montir_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        references: {
            model: Montir,
            key: "id"
        },
        onDelete: 'CASCADE',
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
        },
        onDelete: 'CASCADE',
    },
});

export default Order;