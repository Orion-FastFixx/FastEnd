import { sequelize } from "../../db";
import { DataTypes } from 'sequelize';

const PaymentMethod = sequelize.define("payment_methods", {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    method: {
        type: DataTypes.STRING(30),
        allowNull: true,
    },
});

export default PaymentMethod;