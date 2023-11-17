import { sequelize } from "../../db";
import { DataTypes } from 'sequelize';
import User from "./user.models";
import Kendaraan from "./kendaraan.models";

const Pengendara = sequelize.define("pengendaras", {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    nama: {
        type: DataTypes.STRING(30),
        allowNull: true,
    },
    phone: {
        type: DataTypes.STRING(12),
        allowNull: true,
    },
    lokasi: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    kendaraan_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        references: {
            model: Kendaraan, // This is a reference to another model
            key: 'id', // This is the column name of the referenced model
        }
    },
    user_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: User, // This is a reference to another model
            key: 'id', // This is the column name of the referenced model
        }
    }
});

export default Pengendara;