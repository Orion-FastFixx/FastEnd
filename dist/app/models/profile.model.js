"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../db");
const sequelize_1 = require("sequelize");
const Profile = db_1.sequelize.define("profiles", {
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    tes: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
    coy: {
        type: sequelize_1.DataTypes.STRING(12),
        allowNull: false,
    },
});
exports.default = Profile;
//# sourceMappingURL=profile.model.js.map