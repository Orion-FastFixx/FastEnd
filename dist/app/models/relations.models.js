"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const role_models_1 = __importDefault(require("./role.models"));
const user_models_1 = __importDefault(require("./user.models"));
const pengendara_models_1 = __importDefault(require("./pengendara.models"));
const kendaraan_models_1 = __importDefault(require("./kendaraan.models"));
const bengkel_models_1 = __importDefault(require("./bengkel.models"));
const rating_models_1 = __importDefault(require("./rating.models"));
const admin_models_1 = __importDefault(require("./admin.models"));
const montir_models_1 = __importDefault(require("./montir.models"));
const admin_bengkel_model_1 = __importDefault(require("./admin.bengkel.model"));
const service_model_1 = __importDefault(require("./service.model"));
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
// End Pengendara Relations to Kendaraan
// Start User Relations to Admin
user_models_1.default.hasMany(admin_models_1.default, {
    foreignKey: 'user_id',
    as: 'admin' // This is optional, it's an alias for the association, used in queries
});
admin_models_1.default.belongsTo(user_models_1.default, {
    foreignKey: 'user_id',
    as: 'user' // Optional alias
});
// End User Relations to Admin
// Start User Relations to Montir
user_models_1.default.hasMany(montir_models_1.default, {
    foreignKey: 'user_id',
    as: 'montir' // This is optional, it's an alias for the association, used in queries
});
montir_models_1.default.belongsTo(user_models_1.default, {
    foreignKey: 'user_id',
    as: 'user' // Optional alias
});
// End User Relations to Montir
// Start User Relations to Admin Bengkel
user_models_1.default.hasMany(admin_bengkel_model_1.default, {
    foreignKey: 'user_id',
    as: 'admin_bengkel' // This is optional, it's an alias for the association, used in queries
});
admin_bengkel_model_1.default.belongsTo(user_models_1.default, {
    foreignKey: 'user_id',
    as: 'user' // Optional alias
});
// End User Relations to Admin Bengkel
// Start Admin Bengkel Relations to Bengkel
admin_bengkel_model_1.default.hasMany(bengkel_models_1.default, {
    foreignKey: 'pemilik_id',
    as: 'bengkel' // This is optional, it's an alias for the association, used in queries
});
bengkel_models_1.default.belongsTo(admin_bengkel_model_1.default, {
    foreignKey: 'pemilik_id',
    as: 'admin_bengkel' // Optional alias
});
// End Admin Bengkel Relations to Bengkel
// Bengkel Service is a pivot table between Bengkel and Service
bengkel_models_1.default.belongsToMany(service_model_1.default, {
    through: 'bengkel_services',
    as: 'services',
    foreignKey: 'bengkel_id',
    otherKey: 'service_id'
});
service_model_1.default.belongsToMany(bengkel_models_1.default, {
    through: 'bengkel_services',
    as: 'bengkels',
    foreignKey: 'service_id',
    otherKey: 'bengkel_id'
});
// Start Bengkel Relations to Rating
bengkel_models_1.default.hasMany(rating_models_1.default, {
    foreignKey: 'rating_id',
    as: 'rating' // This is optional, it's an alias for the association, used in queries
});
rating_models_1.default.belongsTo(bengkel_models_1.default, {
    foreignKey: 'rating_id',
    as: 'bengkel' // Optional alias
});
// End Bengkel Relations to Rating
//# sourceMappingURL=relations.models.js.map