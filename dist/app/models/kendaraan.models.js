"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../../db");
const pengendara_models_1 = __importDefault(require("./pengendara.models"));
const Kendaraan = db_1.sequelize.define("kendaraans", {
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    nama_kendaraan: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false,
    },
    jenis: {
        type: sequelize_1.DataTypes.ENUM,
        values: ['Motor', 'Mobil'],
        allowNull: false,
    },
    tahun_kendaraan: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        validate: {
            len: {
                args: [4, 4],
                msg: "Tahun kendaraan harus 4 karakter"
            }
        }
    },
    plat: {
        type: sequelize_1.DataTypes.STRING(10),
        allowNull: false,
        unique: true,
    },
    pengendara_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: pengendara_models_1.default,
            key: "id"
        }
    },
});
exports.default = Kendaraan;
//# sourceMappingURL=kendaraan.models.js.map