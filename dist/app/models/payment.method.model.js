"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../db");
const sequelize_1 = require("sequelize");
const PaymentMethod = db_1.sequelize.define("payment_methods", {
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    method: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: true,
    },
});
exports.default = PaymentMethod;
//# sourceMappingURL=payment.method.model.js.map