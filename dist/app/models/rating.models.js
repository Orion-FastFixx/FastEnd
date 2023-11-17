"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../db");
const sequelize_1 = require("sequelize");
const Rating = db_1.sequelize.define("ratings", {
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    rating: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    review: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
});
exports.default = Rating;
//# sourceMappingURL=rating.models.js.map