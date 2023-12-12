import { sequelize } from "../../db";
import { DataTypes } from 'sequelize';
import Montir from "./montir.models";
import Pengendara from "./pengendara.models";

const MontirRating = sequelize.define("montir_ratings", {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    montir_rating: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    review: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    montir_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: Montir, // This is a reference to another model
            key: 'id', // This is the column name of the referenced model
        },
        onDelete: 'CASCADE',
    },
    pengendara_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: Pengendara, // This is a reference to another model
            key: 'id', // This is the column name of the referenced model
        },
        onDelete: 'CASCADE',
    },
});

export default MontirRating;