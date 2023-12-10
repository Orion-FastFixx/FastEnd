"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../db");
const sequelize_1 = require("sequelize");
const Service = db_1.sequelize.define("services", {
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    layanan: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: true,
    }
});
exports.default = Service;
//# sourceMappingURL=service.model.js.map