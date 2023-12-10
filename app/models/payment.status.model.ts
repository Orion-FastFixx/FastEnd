import { sequelize } from "../../db";
import { DataTypes } from 'sequelize';

const PaymentStatus = sequelize.define("payment_statuses", {
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

export default PaymentStatus;