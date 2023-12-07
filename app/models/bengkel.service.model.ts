import { sequelize } from "../../db";
import { DataTypes } from 'sequelize';
import Bengkel from "./bengkel.models";
import Service from "./service.model";

const BengkelService = sequelize.define("bengkel_services", {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    harga: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    // have relation to bengkel and service
    bengkel_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: 'bengkels', // This is a reference to another model
            key: 'id', // This is the column name of the referenced model
        }
    },
    service_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: 'services', // This is a reference to another model
            key: 'id', // This is the column name of the referenced model
        }
    },
});

export default BengkelService;