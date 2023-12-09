"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
exports.config = {
    serviceName: process.env.SERVICE_NAME,
    jwtKey: process.env.SECRET,
    mysqlHost: process.env.DB_HOST,
    mysqlUser: process.env.DB_USERNAME,
    mysqlPassword: process.env.DB_PASSWORD,
    mysqlDatabase: process.env.DB_DATABASE,
    mysqlPort: process.env.DB_PORT,
    rootPath: path_1.default.resolve(__dirname, '..'),
    uploadsFolder: path_1.default.resolve(__dirname, '..', 'public', 'images')
};
//# sourceMappingURL=index.js.map