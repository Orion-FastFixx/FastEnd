import mongoose from "mongoose";

export const User = mongoose.model(
    "User",
    new mongoose.Schema({
        username: {
            type: String,
            required: [true, "Username wajib diisi"],
        },
        email: {
            type: String,
            unique: true,
            maxlength: [50, "Email maksimal 50 karakter"],
        },
        password: String,
        roles:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role"
        }

    })
);