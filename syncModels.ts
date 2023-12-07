import { sequelize } from "./db";
import Role from "./app/models/role.models";
import User from "./app/models/user.models";
import Pengendara from "./app/models/pengendara.models";
import Kendaraan from "./app/models/kendaraan.models";
import Bengkel from "./app/models/bengkel.models";
import Rating from "./app/models/rating.models";
import Admin from "./app/models/admin.models";
import Montir from "./app/models/montir.models";
import AdminBengkel from "./app/models/admin.bengkel.model";
import BengkelService from "./app/models/bengkel.service.model";
import Service from "./app/models/service.model";

console.log('Is Role model registered:', Role === sequelize.model('roles'));
console.log('Is Kendaraan model registered:', Kendaraan === sequelize.model('kendaraans'));
console.log('Is User model registered:', User === sequelize.model('users'));
console.log('Is Pengendara model registered:', Pengendara === sequelize.model('pengendaras'));
console.log('Is Rating model registered:', Rating === sequelize.model('ratings'));
console.log('Is Bengkel model registered:', Bengkel === sequelize.model('bengkels'));
console.log('Is Admin model registered:', Admin === sequelize.model('admins'));
console.log('Is Montir model registered:', Montir === sequelize.model('montirs'));
console.log('Is AdminBengkel model registered:', AdminBengkel === sequelize.model('admin_bengkels'));
console.log('Is Service model registered:', Service === sequelize.model('services'));
console.log('Is BengkelService model registered:', BengkelService === sequelize.model('bengkel_services'));

sequelize.sync({ force: true }) // Set force to true if you want to drop the tables first
    .then(() => {
        console.log('Database synchronized successfully.');
        process.exit();
    })
    .catch((error: any) => {
        console.error('Error synchronizing the database:', error);
        process.exit(1);
    });