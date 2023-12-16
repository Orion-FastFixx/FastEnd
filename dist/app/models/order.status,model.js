"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../db");
const sequelize_1 = require("sequelize");
const OrderStatus = db_1.sequelize.define("order_statuses", {
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
exports.default = OrderStatus;
//# sourceMappingURL=order.status,model.js.map