import mongoose from "mongoose";

export const Edukasi = mongoose.model(
    "Edukasi",
    new mongoose.Schema ({
        jenisKonten: {
            type: String,
            enum: [
                "Tips",
                "Interior",
                "Exterio",
                "Mesin",
            ]
        },
        kendala: {
            type: String,
            required: [true, "Masukkan Kategori"],
            maxlength: [50, "Nama Kategori Max 50 Karakter"],
        },
        fotoKategori: {
            type: String,
            required: [true, "Foto Kategori"]
        },
        konten: {
            type: String,
            required: [true, "Isi konten untuk kendala"],
        },
        admin: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    }
    )
);