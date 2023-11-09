import mongoose from "mongoose";

export const Role = mongoose.model(
    "Role",
    new mongoose.Schema({
        name: {
            type: String,
            enum: ['admin', 'pengendara', 'mitra'],
            required: true
        }
    })
);