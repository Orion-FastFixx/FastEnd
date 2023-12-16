import { sequelize } from "../../db";
import { DataTypes } from 'sequelize';
import Montir from "./montir.models";
import Service from "./service.model";

const MontirService = sequelize.define("montir_services", {
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
    montir_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: Montir, // This is a reference to another model
            key: 'id', // This is the column name of the referenced model
        }
    },
    service_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: Service, // This is a reference to another model
            key: 'id', // This is the column name of the referenced model
        }
    },
});

export default MontirService;