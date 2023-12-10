import { DataTypes } from 'sequelize';
import { sequelize } from "../../db";
import Pengendara from './pengendara.models';

const Kendaraan = sequelize.define("kendaraans", {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    nama_kendaraan: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    jenis: {
        type: DataTypes.ENUM,
        values: ['Motor', 'Mobil'],
        allowNull: false,
    },
    tahun_kendaraan: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            len: {
                args: [4, 4],
                msg: "Tahun kendaraan harus 4 karakter"
            }
        }
    },
    plat: {
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: true,
    },
    pengendara_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: Pengendara,
            key: "id"
        }
    },
});

export default Kendaraan;