import mongoose from "mongoose";

export const Kendaraan = mongoose.model(
    "Kendaraan",
    new mongoose.Schema({
        namaKendaraan: {
            type: String,
            required: [true, "Nama kendaraan wajib diisi"],
            maxlength: [20, "Nama kendaraan maksimal 20 karakter"],
        },
        jenis: {
            type: String,
            enum: [
                "Motor",
                "Mobil",
            ]
        },
        plat: {
            type: String,
            required: [true, "No plat wajib diisi"],
            unique: true,
            maxlength: [10, "No plat maksimal 10 karakter"],
        },
        pengendara: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Pengendara",
            required: true,
        },
    })
);