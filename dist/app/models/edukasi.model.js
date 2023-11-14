"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.edukasi = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.edukasi = mongoose_1.default.model("Edukasi", new mongoose_1.default.Schema({
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
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}));
//# sourceMappingURL=edukasi.model.js.map