"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.Role = mongoose_1.default.model("Role", new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true
    }
}));
//# sourceMappingURL=role.models%20copy.js.map