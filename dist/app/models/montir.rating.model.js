"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../db");
const sequelize_1 = require("sequelize");
const montir_models_1 = __importDefault(require("./montir.models"));
const pengendara_models_1 = __importDefault(require("./pengendara.models"));
const MontirRating = db_1.sequelize.define("montir_ratings", {
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    montir_rating: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    review: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    montir_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: montir_models_1.default,
            key: 'id', // This is the column name of the referenced model
        },
        onDelete: 'CASCADE',
    },
    pengendara_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: pengendara_models_1.default,
            key: 'id', // This is the column name of the referenced model
        },
        onDelete: 'CASCADE',
    },
});
exports.default = MontirRating;
//# sourceMappingURL=montir.rating.model.js.map