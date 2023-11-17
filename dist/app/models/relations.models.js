"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const role_models_1 = __importDefault(require("./role.models"));
const user_models_1 = __importDefault(require("./user.models"));
const pengendara_models_1 = __importDefault(require("./pengendara.models"));
const kendaraan_models_1 = __importDefault(require("./kendaraan.models"));
// Start User Relations to Role
role_models_1.default.hasMany(user_models_1.default, {
    foreignKey: 'role_id',
    as: 'users' // This is optional, it's an alias for the association, used in queries
});
user_models_1.default.belongsTo(role_models_1.default, {
    foreignKey: 'role_id',
    as: 'role' // Optional alias
});
// End User Relations to Role
// Start User Relations to Pengendara
user_models_1.default.hasMany(pengendara_models_1.default, {
    foreignKey: 'user_id',
    as: 'pengendara' // This is optional, it's an alias for the association, used in queries
});
pengendara_models_1.default.belongsTo(user_models_1.default, {
    foreignKey: 'user_id',
    as: 'user' // Optional alias
});
// End User Relations to Pengendara
// Start Pengendara Relations to Kendaraan
pengendara_models_1.default.hasMany(kendaraan_models_1.default, {
    foreignKey: 'kendaraan_id',
    as: 'kendaraan' // This is optional, it's an alias for the association, used in queries
});
kendaraan_models_1.default.belongsTo(pengendara_models_1.default, {
    foreignKey: 'kendaraan_id',
    as: 'pengendara' // Optional alias
});
//# sourceMappingURL=relations.models.js.map