"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.User = mongoose_1.default.model("User", new mongoose_1.default.Schema({
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
    roles: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Role"
        }
    ]
}));
//# sourceMappingURL=user.models.js.map