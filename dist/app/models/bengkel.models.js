"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bengkel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.Bengkel = mongoose_1.default.model("Bengkel", new mongoose_1.default.Schema({
    namaBengkel: {
        type: String,
        required: [true, "Nama bengkel wajib diisi"],
        maxlength: [50, "Nama bengkel maksimal 50 karakter"],
    },
    nomorTelepon: {
        type: String,
        required: [true, "Nomor telepon wajib diisi"],
        maxlength: [12, "Nomor telepon maksimal 12 karakter"],
    },
    alamat: {
        type: String,
        required: [true, "Alamat wajib diisi"],
        maxlength: [50, "Alamat maksimal 50 karakter"],
    },
    lokasi: {
        type: String,
        required: [true, "Lokasi wajib diisi"],
        maxlength: [50, "Lokasi maksimal 50 karakter"],
    },
    deskripsi: {
        type: String,
        required: [true, "Deskripsi wajib diisi"],
        maxlength: [250, "Deskripsi maksimal 250 karakter"],
    },
    jenisBengkel: {
        type: String,
        enum: [
            "Bengkel Umum",
            "Bengkel Resmi",
        ]
    },
    isOpen: {
        type: Boolean,
    },
    // make foto as array of string
    foto: [{
            type: String,
            required: [true, "Foto wajib diisi"],
        }],
    rating: {
        type: Number,
        default: 0,
    },
    review: [{
            type: String,
        }],
    pemilik: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}));
//# sourceMappingURL=bengkel.models.js.map