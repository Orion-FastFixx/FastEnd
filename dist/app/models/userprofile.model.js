"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../db");
const sequelize_1 = require("sequelize");
const UserProfile = db_1.sequelize.define("user_profiles", {
    bio: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
});
exports.default = UserProfile;
//# sourceMappingURL=userprofile.model.js.map