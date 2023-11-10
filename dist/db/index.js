"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("../app/config");
const initRole_controller_1 = require("../app/controllers/initRole.controller");
mongoose_1.default.connect(config_1.config.urlDb)
    .then(() => {
    console.log('MongoDB connected...');
    (0, initRole_controller_1.initializeRoles)();
})
    .catch((err) => console.log("Connection error: ", err));
exports.db = mongoose_1.default.connection;
//# sourceMappingURL=index.js.map