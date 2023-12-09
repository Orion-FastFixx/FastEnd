"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const admin_bengkel_model_1 = __importDefault(require("./app/models/admin.bengkel.model"));
const admin_models_1 = __importDefault(require("./app/models/admin.models"));
const bengkel_models_1 = __importDefault(require("./app/models/bengkel.models"));
const bengkel_service_model_1 = __importDefault(require("./app/models/bengkel.service.model"));
const kendaraan_models_1 = __importDefault(require("./app/models/kendaraan.models"));
const montir_models_1 = __importDefault(require("./app/models/montir.models"));
const pengendara_models_1 = __importDefault(require("./app/models/pengendara.models"));
const bengkel_rating_models_1 = __importDefault(require("./app/models/bengkel.rating.models"));
const montir_rating_model_1 = __importDefault(require("./app/models/montir.rating.model"));
const role_models_1 = __importDefault(require("./app/models/role.models"));
const service_model_1 = __importDefault(require("./app/models/service.model"));
const user_models_1 = __importDefault(require("./app/models/user.models"));
const order_status_model_1 = __importDefault(require("./app/models/order.status.model"));
const payment_status_model_1 = __importDefault(require("./app/models/payment.status.model"));
const payment_method_model_1 = __importDefault(require("./app/models/payment.method.model"));
const order_model_1 = __importDefault(require("./app/models/order.model"));
const order_service_model_1 = __importDefault(require("./app/models/order.service.model"));
const payment_model_1 = __importDefault(require("./app/models/payment.model"));
const db_1 = require("./db");
console.log('Is Role model registered:', role_models_1.default === db_1.sequelize.model('roles'));
console.log('Is User model registered:', user_models_1.default === db_1.sequelize.model('users'));
console.log('Is Kendaraan model registered:', kendaraan_models_1.default === db_1.sequelize.model('kendaraans'));
console.log('Is Pengendara model registered:', pengendara_models_1.default === db_1.sequelize.model('pengendaras'));
console.log('Is BengkelRating model registered:', bengkel_rating_models_1.default === db_1.sequelize.model('bengkel_ratings'));
console.log('Is MontirRating model registered:', montir_rating_model_1.default === db_1.sequelize.model('montir_ratings'));
console.log('Is Service model registered:', service_model_1.default === db_1.sequelize.model('services'));
console.log('Is Bengkel model registered:', bengkel_models_1.default === db_1.sequelize.model('bengkels'));
console.log('Is Admin model registered:', admin_models_1.default === db_1.sequelize.model('admins'));
console.log('Is Montir model registered:', montir_models_1.default === db_1.sequelize.model('montirs'));
console.log('Is AdminBengkel model registered:', admin_bengkel_model_1.default === db_1.sequelize.model('admin_bengkels'));
console.log('Is BengkelService model registered:', bengkel_service_model_1.default === db_1.sequelize.model('bengkel_services'));
console.log('Is OrderStatus model registered:', order_status_model_1.default === db_1.sequelize.model('order_statuses'));
console.log('Is PaymentStatus model registered:', payment_status_model_1.default === db_1.sequelize.model('payment_statuses'));
console.log('Is PaymentMethod model registered:', payment_method_model_1.default === db_1.sequelize.model('payment_methods'));
console.log('Is Order model registered:', order_model_1.default === db_1.sequelize.model('orders'));
console.log('Is OrderService model registered:', order_service_model_1.default === db_1.sequelize.model('order_services'));
console.log('Is Payment model registered:', payment_model_1.default === db_1.sequelize.model('payments'));
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