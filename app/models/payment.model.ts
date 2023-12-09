import { sequelize } from "../../db";
import { DataTypes } from 'sequelize';
import Order from "./order.model";
import PaymentStatus from "./payment.status.model";
import PaymentMethod from "./payment.method.model";

const Payment = sequelize.define("payments", {
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
        }
    },
    payment_method_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: PaymentMethod,
            key: "id"
        }
    },
    payment_status_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: PaymentStatus,
            key: "id"
        }
    },
});

export default Payment;