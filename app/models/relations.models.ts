import Role from "./role.models";
import User from "./user.models";
import Pengendara from "./pengendara.models";
import Kendaraan from "./kendaraan.models";
import Bengkel from "./bengkel.models";
import Rating from "./rating.models";
import Admin from "./admin.models";
import Montir from "./montir.models";
import AdminBengkel from "./admin.bengkel.model";
import BengkelService from "./bengkel.service.model";
import Service from "./service.model";

export const relations = () => {
    // Start User Relations to Role

    Role.hasMany(User, {
        foreignKey: 'role_id', // Ensure this matches the foreign key attribute in the User model
        // as: 'users' // This is optional, it's an alias for the association, used in queries
    });


    User.belongsTo(Role, {
        foreignKey: 'role_id',
        // as: 'role' // Optional alias
    });

    // End User Relations to Role

    // Start User Relations to Pengendara

    User.hasMany(Pengendara, {
        foreignKey: 'user_id', // Ensure this matches the foreign key attribute in the User model
        as: 'pengendara' // This is optional, it's an alias for the association, used in queries
    });

    Pengendara.belongsTo(User, {
        foreignKey: 'user_id',
        as: 'user' // Optional alias
    });

    // End User Relations to Pengendara

    // Start Pengendara Relations to Kendaraan

    Pengendara.hasMany(Kendaraan, {
        foreignKey: 'kendaraan_id', // Ensure this matches the foreign key attribute in the User model
        as: 'kendaraan' // This is optional, it's an alias for the association, used in queries
    });

    Kendaraan.belongsTo(Pengendara, {
        foreignKey: 'kendaraan_id',
        as: 'pengendara' // Optional alias
    });

    // End Pengendara Relations to Kendaraan

    // Start User Relations to Admin

    User.hasMany(Admin, {
        foreignKey: 'user_id', // Ensure this matches the foreign key attribute in the User model
        as: 'admin' // This is optional, it's an alias for the association, used in queries
    });

    Admin.belongsTo(User, {
        foreignKey: 'user_id',
        as: 'user' // Optional alias
    });

    // End User Relations to Admin

    // Start User Relations to Montir

    User.hasMany(Montir, {
        foreignKey: 'user_id', // Ensure this matches the foreign key attribute in the User model
        as: 'montir' // This is optional, it's an alias for the association, used in queries
    });

    Montir.belongsTo(User, {
        foreignKey: 'user_id',
        as: 'user' // Optional alias
    });

    // End User Relations to Montir

    // Start User Relations to Admin Bengkel
    User.hasMany(AdminBengkel, {
        foreignKey: 'user_id', // Ensure this matches the foreign key attribute in the User model
        as: 'admin_bengkel' // This is optional, it's an alias for the association, used in queries
    });

    AdminBengkel.belongsTo(User, {
        foreignKey: 'user_id',
        as: 'user' // Optional alias
    });

    // End User Relations to Admin Bengkel

    // Start Admin Bengkel Relations to Bengkel

    AdminBengkel.hasMany(Bengkel, {
        foreignKey: 'pemilik_id', // Ensure this matches the foreign key attribute in the Admin Bengkel model
        as: 'bengkel' // This is optional, it's an alias for the association, used in queries
    });

    Bengkel.belongsTo(AdminBengkel, {
        foreignKey: 'pemilik_id',
        as: 'admin_bengkel' // Optional alias
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



    // Start Bengkel Relations to Rating

    Bengkel.hasMany(Rating, {
        foreignKey: 'rating_id', // Ensure this matches the foreign key attribute in the User model
        as: 'rating' // This is optional, it's an alias for the association, used in queries
    });

    Rating.belongsTo(Bengkel, {
        foreignKey: 'rating_id',
        as: 'bengkel' // Optional alias
    });

    // End Bengkel Relations to Rating
}



