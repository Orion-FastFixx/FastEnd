import mongoose from "mongoose";

export const edukasi = mongoose.model(
    "Edukasi",
    new mongoose.Schema ({
        jenisEdukasi: {
            type: String,
            enum: [
                "Tips",
                "Interior",
                "Exterio",
                "Mesin",
            ]
        },
        kategori: {
            type: String,
            required: [true, "Masukkan Kategori"],
            maxlength: [50, "Nama Kategori Max 50 Karakter"],
        },
        fotoKategori: {
            type: String,
            required: [true, "Foto Kategori"]
        },
        kendala: {
            type: String,
            required: [true, "Isi Kendala"],
            maxlength: [50, "Maksimal 50 Karakter"],
        },
        konten: {
            type: String,
            required: [true, "Isi konten untuk kendala"],
        },
        admin: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    }
    )
);