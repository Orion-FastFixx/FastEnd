"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./db");
const role_models_1 = __importDefault(require("./app/models/role.models"));
const user_models_1 = __importDefault(require("./app/models/user.models"));
const pengendara_models_1 = __importDefault(require("./app/models/pengendara.models"));
const kendaraan_models_1 = __importDefault(require("./app/models/kendaraan.models"));
const bengkel_models_1 = __importDefault(require("./app/models/bengkel.models"));
const rating_models_1 = __importDefault(require("./app/models/rating.models"));
console.log('Is Role model registered:', role_models_1.default === db_1.sequelize.model('roles'));
console.log('Is Kendaraan model registered:', kendaraan_models_1.default === db_1.sequelize.model('kendaraans'));
console.log('Is User model registered:', user_models_1.default === db_1.sequelize.model('users'));
console.log('Is Pengendara model registered:', pengendara_models_1.default === db_1.sequelize.model('pengendaras'));
console.log('Is Rating model registered:', rating_models_1.default === db_1.sequelize.model('ratings'));
console.log('Is Bengkel model registered:', bengkel_models_1.default === db_1.sequelize.model('bengkels'));
db_1.sequelize.sync({ force: true }) // Set force to true if you want to drop the tables first
    .then(() => {
    console.log('Database synchronized successfully.');
    process.exit();
})
    .catch((error) => {
    console.error('Error synchronizing the database:', error);
    process.exit(1);
});
//# sourceMappingURL=syncModels.js.map