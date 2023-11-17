"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../db");
const sequelize_1 = require("sequelize");
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
    tahunKendaraan: {
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
});
exports.default = Kendaraan;
//# sourceMappingURL=kendaraan.models.js.map