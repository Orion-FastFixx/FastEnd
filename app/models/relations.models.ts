import AdminBengkel from "./admin.bengkel.model";
import Admin from "./admin.models";
import Bengkel from "./bengkel.models";
import BengkelRating from "./bengkel.rating.models";
import BengkelService from "./bengkel.service.model";
import Kendaraan from "./kendaraan.models";
import Montir from "./montir.models";
import MontirRating from "./montir.rating.model";
import Order from "./order.model";
import OrderService from "./order.service.model";
import OrderStatus from "./order.status.model";
import PaymentMethod from "./payment.method.model";
import Payment from "./payment.model";
import PaymentStatus from "./payment.status.model";
import Pengendara from "./pengendara.models";
import Role from "./role.models";
import Service from "./service.model";
import User from "./user.models";

export const relations = () => {
    // Start User Relations to Role

    Role.hasMany(User, {
        foreignKey: 'role_id', // Ensure this matches the foreign key attribute in the User model
        as: 'users' // This is optional, it's an alias for the association, used in queries
    });


    User.belongsTo(Role, {
        foreignKey: 'role_id',
        as: 'role' // Optional alias
    });

    // End User Relations to Role

    // Start User Relations to Pengendara

    User.hasMany(Pengendara, {
        foreignKey: 'user_id', // Ensure this matches the foreign key attribute in the User model
        as: 'pengendara', // This is optional, it's an alias for the association, used in queries
        onDelete: 'CASCADE',
    });

    Pengendara.belongsTo(User, {
        foreignKey: 'user_id',
        as: 'user', // Optional alias
        onDelete: 'CASCADE',
    });

    // End User Relations to Pengendara

    // Start Pengendara Relations to Kendaraan

    Pengendara.hasMany(Kendaraan, {
        foreignKey: 'pengendara_id', // Ensure this matches the foreign key attribute in the User model
        as: 'kendaraan', // This is optional, it's an alias for the association, used in queries
        onDelete: 'CASCADE',
    });

    Kendaraan.belongsTo(Pengendara, {
        foreignKey: 'pengendara_id',
        as: 'pengendara', // Optional alias
        onDelete: 'CASCADE',
    });

    // End Pengendara Relations to Kendaraan

    // Start User Relations to Admin

    User.hasMany(Admin, {
        foreignKey: 'user_id', // Ensure this matches the foreign key attribute in the User model
        as: 'admin', // This is optional, it's an alias for the association, used in queries
        onDelete: 'CASCADE',
    });

    Admin.belongsTo(User, {
        foreignKey: 'user_id',
        as: 'user', // Optional alias
        onDelete: 'CASCADE',
    });

    // End User Relations to Admin

    // Start User Relations to Montir

    User.hasMany(Montir, {
        foreignKey: 'user_id', // Ensure this matches the foreign key attribute in the User model
        as: 'montir', // This is optional, it's an alias for the association, used in queries
        onDelete: 'CASCADE',
    });

    Montir.belongsTo(User, {
        foreignKey: 'user_id',
        as: 'user', // Optional alias
        onDelete: 'CASCADE',
    });

    // End User Relations to Montir

    // Start User Relations to Admin Bengkel
    User.hasMany(AdminBengkel, {
        foreignKey: 'user_id', // Ensure this matches the foreign key attribute in the User model
        as: 'admin_bengkel', // This is optional, it's an alias for the association, used in queries
        onDelete: 'CASCADE',
    });

    AdminBengkel.belongsTo(User, {
        foreignKey: 'user_id',
        as: 'user', // Optional alias
        onDelete: 'CASCADE',
    });

    // End User Relations to Admin Bengkel

    // Start Admin Bengkel Relations to Bengkel

    AdminBengkel.hasMany(Bengkel, {
        foreignKey: 'pemilik_id', // Ensure this matches the foreign key attribute in the Admin Bengkel model
        as: 'bengkel', // This is optional, it's an alias for the association, used in queries
        onDelete: 'CASCADE',
    });

    Bengkel.belongsTo(AdminBengkel, {
        foreignKey: 'pemilik_id',
        as: 'admin_bengkel', // Optional alias
        onDelete: 'CASCADE',
    });

    // End Admin Bengkel Relations to Bengkel

    // Bengkel Service is a pivot table between Bengkel and Service

    Bengkel.belongsToMany(Service, {
        through: BengkelService,
        as: 'services',
        foreignKey: 'bengkel_id',
    });

    Service.belongsToMany(Bengkel, {
        through: BengkelService,
        as: 'bengkels',
        foreignKey: 'service_id',
    });



    // Start Bengkel Relations to Bengkel Rating

    Bengkel.hasMany(BengkelRating, {
        foreignKey: 'bengkel_id', // Ensure this matches the foreign key attribute in the User model
        as: 'rating' // This is optional, it's an alias for the association, used in queries
    });

    BengkelRating.belongsTo(Bengkel, {
        foreignKey: 'bengkel_id',
        as: 'bengkel' // Optional alias
    });

    // End Bengkel Relations to Rating

    // Start Pengendara Relations to Bengkel Rating
    Pengendara.hasMany(BengkelRating, {
        foreignKey: 'pengendara_id', // Ensure this matches the foreign key attribute in the User model
        as: 'rating_bengkel' // This is optional, it's an alias for the association, used in queries
    });

    BengkelRating.belongsTo(Pengendara, {
        foreignKey: 'pengendara_id',
        as: 'pengendara' // Optional alias
    });

    // End Pengendara Relations to Bengkel Rating

    // Start Montir Relations to Montir Rating

    Montir.hasMany(MontirRating, {
        foreignKey: 'montir_id', // Ensure this matches the foreign key attribute in the User model
        as: 'rating' // This is optional, it's an alias for the association, used in queries
    });

    MontirRating.belongsTo(Montir, {
        foreignKey: 'montir_id',
        as: 'montir' // Optional alias
    });

    // End Montir Relations to Montir Rating

    // Start Pengendara Relations to Montir Rating

    Pengendara.hasMany(MontirRating, {
        foreignKey: 'pengendara_id', // Ensure this matches the foreign key attribute in the User model
        as: 'rating_montir' // This is optional, it's an alias for the association, used in queries
    });

    MontirRating.belongsTo(Pengendara, {
        foreignKey: 'pengendara_id',
        as: 'pengendara' // Optional alias
    });

    // End Pengendara Relations to Montir Rating

    // Order to Order status
    
    OrderStatus.hasMany(Order, {
        foreignKey: 'order_status_id', // Ensure this matches the foreign key attribute in the User model
        as: 'order' // This is optional, it's an alias for the association, used in queries
    });

    Order.belongsTo(OrderStatus, {
        foreignKey: 'order_status_id',
        as: 'order_status' // Optional alias
    });

    // End Order to Order status

    // Payment to Payment status

    PaymentStatus.hasMany(Payment, {
        foreignKey: 'payment_status_id', // Ensure this matches the foreign key attribute in the User model
        as: 'payment' // This is optional, it's an alias for the association, used in queries
    });

    Payment.belongsTo(PaymentStatus, {
        foreignKey: 'payment_status_id',
        as: 'payment_status' // Optional alias
    });

    // End Payment to Payment status

    // Payment to Payment method

    PaymentMethod.hasMany(Payment, {
        foreignKey: 'payment_method_id', // Ensure this matches the foreign key attribute in the User model
        as: 'payment' // This is optional, it's an alias for the association, used in queries
    });

    Payment.belongsTo(PaymentMethod, {
        foreignKey: 'payment_method_id',
        as: 'payment_method' // Optional alias
    });

    // End Payment to Payment method

    // The bengkel orders

    Pengendara.hasMany(Order, {
        foreignKey: 'pengendara_id', // Ensure this matches the foreign key attribute in the User model
        as: 'order' // This is optional, it's an alias for the association, used in queries
    });

    Order.belongsTo(Pengendara, {
        foreignKey: 'pengendara_id',
        as: 'pengendara' // Optional alias
    });

    Bengkel.hasMany(Order, {
        foreignKey: 'bengkel_id', // Ensure this matches the foreign key attribute in the User model
        as: 'order' // This is optional, it's an alias for the association, used in queries
    });

    Order.belongsTo(Bengkel, {
        foreignKey: 'bengkel_id',
        as: 'bengkel' // Optional alias
    });

    Order.belongsToMany(Service, {
        through: OrderService,
        as: 'services',
        foreignKey: 'order_id',
    });

    Service.belongsToMany(Order, {
        through: OrderService,
        as: 'orders',
        foreignKey: 'service_id',
    });
    

    Order.hasOne(Payment, {
        foreignKey: 'order_id',
        as: 'payment'
    });

    Payment.belongsTo(Order, {
        foreignKey: 'order_id',
        as: 'order'
    });

    // End Bengkel Orders

}



