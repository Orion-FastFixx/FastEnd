"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pengendara = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.Pengendara = mongoose_1.default.model("Pengendara", new mongoose_1.default.Schema({
    nama: {
        type: String,
        required: [true, "Nama wajib diisi"],
        maxlength: [30, "Nama maksimal 30 karakter"],
    },
    nomorTelepon: {
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
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Kendaraan",
        }],
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
    },
}));
//# sourceMappingURL=pengendara.models.js.map