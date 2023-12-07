"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../db");
const sequelize_1 = require("sequelize");
const PaymentStatus = db_1.sequelize.define("payment_statuses", {
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    status: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: true,
    },
});
exports.default = PaymentStatus;
//# sourceMappingURL=payment.status.model.js.map