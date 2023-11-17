import Role from "./role.models";
import User from "./user.models";
import Pengendara from "./pengendara.models";
import Kendaraan from "./kendaraan.models";
import Bengkel from "./bengkel.models";
import Rating from "./rating.models";

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

// Start User Relations to Bengkel

User.hasMany(Bengkel, {
    foreignKey: 'pemilik_id', // Ensure this matches the foreign key attribute in the User model
    as: 'bengkel' // This is optional, it's an alias for the association, used in queries
});

Bengkel.belongsTo(User, {
    foreignKey: 'pemilik_id',
    as: 'user' // Optional alias
});

// End User Relations to Bengkel

// Start Bengkel Relations to Rating

Bengkel.hasMany(Rating, {
    foreignKey: 'rating_id', // Ensure this matches the foreign key attribute in the User model
    as: 'rating' // This is optional, it's an alias for the association, used in queries
});

Rating.belongsTo(Bengkel, {
    foreignKey: 'rating_id',
    as: 'bengkel' // Optional alias
});
