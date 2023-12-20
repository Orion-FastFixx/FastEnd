import AdminBengkel from "./app/models/admin.bengkel.model";
import Admin from "./app/models/admin.models";
import Bengkel from "./app/models/bengkel.models";
import BengkelService from "./app/models/bengkel.service.model";
import MontirService from "./app/models/montir.service.model";
import Pengendara from "./app/models/pengendara.models";
import Kendaraan from "./app/models/kendaraan.models";
import Montir from "./app/models/montir.models";
import BengkelRating from "./app/models/bengkel.rating.models";
import MontirRating from "./app/models/montir.rating.model";
import Role from "./app/models/role.models";
import Service from "./app/models/service.model";
import User from "./app/models/user.models";
import OrderStatus from "./app/models/order.status.model";
import PaymentStatus from "./app/models/payment.status.model";
import PaymentMethod from "./app/models/payment.method.model";
import Order from "./app/models/order.model";
import OrderService from "./app/models/order.service.model";
import Payment from "./app/models/payment.model";
import RefreshToken from "./app/models/refresh.token.model";
import { sequelize } from "./db";
import Education from "./app/models/edukasi.models";


console.log('Is Role model registered:', Role === sequelize.model('roles'));
console.log('Is User model registered:', User === sequelize.model('users'));
console.log('Is Pengendara model registered:', Pengendara === sequelize.model('pengendaras'));
console.log('Is Kendaraan model registered:', Kendaraan === sequelize.model('kendaraans'));
console.log('Is BengkelRating model registered:', BengkelRating === sequelize.model('bengkel_ratings'));
console.log('Is MontirRating model registered:', MontirRating === sequelize.model('montir_ratings'));
console.log('Is Service model registered:', Service === sequelize.model('services'));
console.log('Is Bengkel model registered:', Bengkel === sequelize.model('bengkels'));
console.log('Is Admin model registered:', Admin === sequelize.model('admins'));
console.log('Is Montir model registered:', Montir === sequelize.model('montirs'));
console.log('Is AdminBengkel model registered:', AdminBengkel === sequelize.model('admin_bengkels'));
console.log('Is BengkelService model registered:', BengkelService === sequelize.model('bengkel_services'));
console.log('Is OrderStatus model registered:', OrderStatus === sequelize.model('order_statuses'));
console.log('Is PaymentStatus model registered:', PaymentStatus === sequelize.model('payment_statuses'));
console.log('Is PaymentMethod model registered:', PaymentMethod === sequelize.model('payment_methods'));
console.log('Is Order model registered:', Order === sequelize.model('orders'));
console.log('Is OrderService model registered:', OrderService === sequelize.model('order_services'));
console.log('Is Payment model registered:', Payment === sequelize.model('payments'));
console.log('Is RefreshToken model registered:', RefreshToken === sequelize.model('refresh_tokens'));

console.log('Is MontirService model registered:', MontirService === sequelize.model('montir_services'));
console.log('Is Education model registered:', Education === sequelize.model('educations'));


sequelize.sync({ force: true }) // Set force to true if you want to drop the tables first
    .then(() => {
        console.log('Database synchronized successfully.'); 
        process.exit();
    })
    .catch((error: any) => {
        console.error('Error synchronizing the database:', error);
        process.exit(1);
    }); 