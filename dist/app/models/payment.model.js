"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../db");
const sequelize_1 = require("sequelize");
const order_model_1 = __importDefault(require("./order.model"));
const payment_status_model_1 = __importDefault(require("./payment.status.model"));
const payment_method_model_1 = __importDefault(require("./payment.method.model"));
const Payment = db_1.sequelize.define("payments", {
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
    payment_method_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: payment_method_model_1.default,
            key: "id"
        }
    },
    payment_status_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: payment_status_model_1.default,
            key: "id"
        }
    },
});
exports.default = Payment;
//# sourceMappingURL=payment.model.js.map