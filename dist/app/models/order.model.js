"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../db");
const sequelize_1 = require("sequelize");
const order_status_model_1 = __importDefault(require("./order.status.model"));
const pengendara_models_1 = __importDefault(require("./pengendara.models"));
const bengkel_models_1 = __importDefault(require("./bengkel.models"));
const montir_models_1 = __importDefault(require("./montir.models"));
const Order = db_1.sequelize.define("orders", {
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    additional_info: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: true,
        get() {
            const rawValue = this.getDataValue('additional_info');
            try {
                return JSON.parse(rawValue);
            }
            catch (error) {
                return rawValue; // or return {} or null based on your preference
            }
        }
    },
    pengendara_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        references: {
            model: pengendara_models_1.default,
            key: "id"
        }
    },
    bengkel_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        references: {
            model: bengkel_models_1.default,
            key: "id"
        }
    },
    montir_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        references: {
            model: montir_models_1.default,
            key: "id"
        }
    },
    total_harga: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00
    },
    order_status_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        references: {
            model: order_status_model_1.default,
            key: "id"
        }
    },
});
exports.default = Order;
//# sourceMappingURL=order.model.js.map