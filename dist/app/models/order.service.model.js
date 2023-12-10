"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../db");
const sequelize_1 = require("sequelize");
const order_model_1 = __importDefault(require("./order.model"));
const service_model_1 = __importDefault(require("./service.model"));
const OrderService = db_1.sequelize.define("order_services", {
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    order_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: order_model_1.default,
            key: "id"
        }
    },
    service_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: service_model_1.default,
            key: "id"
        }
    },
    price: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
});
exports.default = OrderService;
//# sourceMappingURL=order.service.model.js.map