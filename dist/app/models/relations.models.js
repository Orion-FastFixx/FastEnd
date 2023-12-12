"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.relations = void 0;
const admin_bengkel_model_1 = __importDefault(require("./admin.bengkel.model"));
const admin_models_1 = __importDefault(require("./admin.models"));
const bengkel_models_1 = __importDefault(require("./bengkel.models"));
const bengkel_rating_models_1 = __importDefault(require("./bengkel.rating.models"));
const bengkel_service_model_1 = __importDefault(require("./bengkel.service.model"));
const kendaraan_models_1 = __importDefault(require("./kendaraan.models"));
const montir_models_1 = __importDefault(require("./montir.models"));
const montir_rating_model_1 = __importDefault(require("./montir.rating.model"));
const order_model_1 = __importDefault(require("./order.model"));
const order_service_model_1 = __importDefault(require("./order.service.model"));
const order_status_model_1 = __importDefault(require("./order.status.model"));
const payment_method_model_1 = __importDefault(require("./payment.method.model"));
const payment_model_1 = __importDefault(require("./payment.model"));
const payment_status_model_1 = __importDefault(require("./payment.status.model"));
const pengendara_models_1 = __importDefault(require("./pengendara.models"));
const role_models_1 = __importDefault(require("./role.models"));
const service_model_1 = __importDefault(require("./service.model"));
const user_models_1 = __importDefault(require("./user.models"));
const relations = () => {
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
        as: 'pengendara',
        onDelete: 'CASCADE',
    });
    pengendara_models_1.default.belongsTo(user_models_1.default, {
        foreignKey: 'user_id',
        as: 'user',
        onDelete: 'CASCADE',
    });
    // End User Relations to Pengendara
    // Start Pengendara Relations to Kendaraan
    pengendara_models_1.default.hasMany(kendaraan_models_1.default, {
        foreignKey: 'pengendara_id',
        as: 'kendaraan',
        onDelete: 'CASCADE',
    });
    kendaraan_models_1.default.belongsTo(pengendara_models_1.default, {
        foreignKey: 'pengendara_id',
        as: 'pengendara',
        onDelete: 'CASCADE',
    });
    // End Pengendara Relations to Kendaraan
    // Start User Relations to Admin
    user_models_1.default.hasMany(admin_models_1.default, {
        foreignKey: 'user_id',
        as: 'admin',
        onDelete: 'CASCADE',
    });
    admin_models_1.default.belongsTo(user_models_1.default, {
        foreignKey: 'user_id',
        as: 'user',
        onDelete: 'CASCADE',
    });
    // End User Relations to Admin
    // Start User Relations to Montir
    user_models_1.default.hasMany(montir_models_1.default, {
        foreignKey: 'user_id',
        as: 'montir',
        onDelete: 'CASCADE',
    });
    montir_models_1.default.belongsTo(user_models_1.default, {
        foreignKey: 'user_id',
        as: 'user',
        onDelete: 'CASCADE',
    });
    // End User Relations to Montir
    // Start User Relations to Admin Bengkel
    user_models_1.default.hasMany(admin_bengkel_model_1.default, {
        foreignKey: 'user_id',
        as: 'admin_bengkel',
        onDelete: 'CASCADE',
    });
    admin_bengkel_model_1.default.belongsTo(user_models_1.default, {
        foreignKey: 'user_id',
        as: 'user',
        onDelete: 'CASCADE',
    });
    // End User Relations to Admin Bengkel
    // Start Admin Bengkel Relations to Bengkel
    admin_bengkel_model_1.default.hasMany(bengkel_models_1.default, {
        foreignKey: 'pemilik_id',
        as: 'bengkel',
        onDelete: 'CASCADE',
    });
    bengkel_models_1.default.belongsTo(admin_bengkel_model_1.default, {
        foreignKey: 'pemilik_id',
        as: 'admin_bengkel',
        onDelete: 'CASCADE',
    });
    // End Admin Bengkel Relations to Bengkel
    // Bengkel Service is a pivot table between Bengkel and Service
    bengkel_models_1.default.belongsToMany(service_model_1.default, {
        through: bengkel_service_model_1.default,
        as: 'services',
        foreignKey: 'bengkel_id',
        onDelete: 'CASCADE',
    });
    service_model_1.default.belongsToMany(bengkel_models_1.default, {
        through: bengkel_service_model_1.default,
        as: 'bengkels',
        foreignKey: 'service_id',
        onDelete: 'CASCADE',
    });
    // Start Bengkel Relations to Bengkel Rating
    bengkel_models_1.default.hasMany(bengkel_rating_models_1.default, {
        foreignKey: 'bengkel_id',
        as: 'rating',
        onDelete: 'CASCADE',
    });
    bengkel_rating_models_1.default.belongsTo(bengkel_models_1.default, {
        foreignKey: 'bengkel_id',
        as: 'bengkel',
        onDelete: 'CASCADE',
    });
    // End Bengkel Relations to Rating
    // Start Pengendara Relations to Bengkel Rating
    pengendara_models_1.default.hasMany(bengkel_rating_models_1.default, {
        foreignKey: 'pengendara_id',
        as: 'rating_bengkel',
        onDelete: 'CASCADE',
    });
    bengkel_rating_models_1.default.belongsTo(pengendara_models_1.default, {
        foreignKey: 'pengendara_id',
        as: 'pengendara',
        onDelete: 'CASCADE',
    });
    // End Pengendara Relations to Bengkel Rating
    // Start Montir Relations to Montir Rating
    montir_models_1.default.hasMany(montir_rating_model_1.default, {
        foreignKey: 'montir_id',
        as: 'rating',
        onDelete: 'CASCADE',
    });
    montir_rating_model_1.default.belongsTo(montir_models_1.default, {
        foreignKey: 'montir_id',
        as: 'montir',
        onDelete: 'CASCADE',
    });
    // End Montir Relations to Montir Rating
    // Start Pengendara Relations to Montir Rating
    pengendara_models_1.default.hasMany(montir_rating_model_1.default, {
        foreignKey: 'pengendara_id',
        as: 'rating_montir',
        onDelete: 'CASCADE',
    });
    montir_rating_model_1.default.belongsTo(pengendara_models_1.default, {
        foreignKey: 'pengendara_id',
        as: 'pengendara',
        onDelete: 'CASCADE',
    });
    // End Pengendara Relations to Montir Rating
    // Order to Order status
    order_status_model_1.default.hasMany(order_model_1.default, {
        foreignKey: 'order_status_id',
        as: 'order' // This is optional, it's an alias for the association, used in queries
    });
    order_model_1.default.belongsTo(order_status_model_1.default, {
        foreignKey: 'order_status_id',
        as: 'order_status' // Optional alias
    });
    // End Order to Order status
    // Payment to Payment status
    payment_status_model_1.default.hasMany(payment_model_1.default, {
        foreignKey: 'payment_status_id',
        as: 'payment' // This is optional, it's an alias for the association, used in queries
    });
    payment_model_1.default.belongsTo(payment_status_model_1.default, {
        foreignKey: 'payment_status_id',
        as: 'payment_status' // Optional alias
    });
    // End Payment to Payment status
    // Payment to Payment method
    payment_method_model_1.default.hasMany(payment_model_1.default, {
        foreignKey: 'payment_method_id',
        as: 'payment' // This is optional, it's an alias for the association, used in queries
    });
    payment_model_1.default.belongsTo(payment_method_model_1.default, {
        foreignKey: 'payment_method_id',
        as: 'payment_method' // Optional alias
    });
    // End Payment to Payment method
    // The bengkel orders
    pengendara_models_1.default.hasMany(order_model_1.default, {
        foreignKey: 'pengendara_id',
        as: 'order' // This is optional, it's an alias for the association, used in queries
    });
    order_model_1.default.belongsTo(pengendara_models_1.default, {
        foreignKey: 'pengendara_id',
        as: 'pengendara' // Optional alias
    });
    bengkel_models_1.default.hasMany(order_model_1.default, {
        foreignKey: 'bengkel_id',
        as: 'order' // This is optional, it's an alias for the association, used in queries
    });
    order_model_1.default.belongsTo(bengkel_models_1.default, {
        foreignKey: 'bengkel_id',
        as: 'bengkel' // Optional alias
    });
    order_model_1.default.belongsToMany(service_model_1.default, {
        through: order_service_model_1.default,
        as: 'services',
        foreignKey: 'order_id',
    });
    service_model_1.default.belongsToMany(order_model_1.default, {
        through: order_service_model_1.default,
        as: 'orders',
        foreignKey: 'service_id',
    });
    order_model_1.default.hasOne(payment_model_1.default, {
        foreignKey: 'order_id',
        as: 'payment'
    });
    payment_model_1.default.belongsTo(order_model_1.default, {
        foreignKey: 'order_id',
        as: 'order'
    });
    // End Bengkel Orders
};
exports.relations = relations;
//# sourceMappingURL=relations.models.js.map