"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.config = {
    serviceName: process.env.SERVICE_NAME,
    jwtKey: process.env.SECRET,
    mysqlHost: process.env.DB_HOST,
    mysqlUser: process.env.DB_USERNAME,
    mysqlPassword: process.env.DB_PASSWORD,
    mysqlDatabase: process.env.DB_DATABASE,
    mysqlPort: process.env.DB_PORT,
};
//# sourceMappingURL=index.js.map