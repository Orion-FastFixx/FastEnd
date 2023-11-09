import mongoose from "mongoose";
export const Pengendara = mongoose.model(
    "Pengendara",
    new mongoose.Schema({
        nama: {
            type: String,
            required: [true, "Nama wajib diisi"],
            maxlength: [30, "Nama maksimal 30 karakter"],
        },
        jenisKelamin: {
            type: String,
            enum: [
                "Laki-laki",
                "Perempuan",
            ]
        },
        phone: {
            type: String,
            required: [true, "No telepon wajib diisi"],
            unique: true,
            maxlength: [12, "No telepon maksimal 12 karakter"],
        },
        lokasi: {
            type: String,
            required: [true, "Lokasi wajib diisi"],
            maxlength: [30, "Lokasi maksimal 30 karakter"],
        },
        kendaraan: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Kendaraan",
        }],
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    })
);