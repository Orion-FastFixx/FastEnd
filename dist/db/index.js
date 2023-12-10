"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDb = exports.sequelize = void 0;
const config_1 = require("../app/config");
const sequelize_1 = require("sequelize");
// Initialize a new Sequelize instance
const sequelize = new sequelize_1.Sequelize(config_1.config.mysqlDatabase, config_1.config.mysqlUser, config_1.config.mysqlPassword, {
    host: config_1.config.mysqlHost,
    dialect: 'mysql',
    port: config_1.config.mysqlPort,
    timezone: config_1.config.mysqlTimezone, // for writing to database
});
exports.sequelize = sequelize;
const connectDb = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield sequelize.authenticate();
        console.log('Connection has been established successfully.');
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});
exports.connectDb = connectDb;
connectDb();
//# sourceMappingURL=index.js.map