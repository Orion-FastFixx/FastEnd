"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Kendaraan = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.Kendaraan = mongoose_1.default.model("Kendaraan", new mongoose_1.default.Schema({
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
    tahunKendaraan: {
        type: Number,
        required: [true, "Tahun kendaraan wajib diisi"],
        maxlength: [4, "Tahun kendaraan maksimal 4 karakter"],
    },
    plat: {
        type: String,
        required: [true, "No plat wajib diisi"],
        unique: true,
        maxlength: [10, "No plat maksimal 10 karakter"],
    },
    pengendara: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Pengendara",
        required: true,
    },
}));
//# sourceMappingURL=kendaraan.models.js.map