import { sequelize } from "../../db";
import { DataTypes } from 'sequelize';
import Bengkel from "./bengkel.models";
import Pengendara from "./pengendara.models";

const BengkelRating = sequelize.define("bengkel_ratings", {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    bengkel_rating: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    review: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    bengkel_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: Bengkel, // This is a reference to another model
            key: 'id', // This is the column name of the referenced model
        }
    },
    pengendara_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: Pengendara, // This is a reference to another model
            key: 'id', // This is the column name of the referenced model
        }
    },
});

export default BengkelRating;