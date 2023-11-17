"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../db");
const sequelize_1 = require("sequelize");
const role_models_1 = __importDefault(require("./role.models"));
const User = db_1.sequelize.define("users", {
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
    password: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    role_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: role_models_1.default,
            key: 'id', // This is the column name of the referenced model
        }
    },
});
exports.default = User;
//# sourceMappingURL=user.models.js.map