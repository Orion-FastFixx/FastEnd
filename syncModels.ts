import { sequelize } from "./db";
import Role from "./app/models/role.models";
import User from "./app/models/user.models";
import Pengendara from "./app/models/pengendara.models";
import Kendaraan from "./app/models/kendaraan.models";

console.log('Is Role model registered:', Role === sequelize.model('roles'));
console.log('Is Kendaraan model registered:', Kendaraan === sequelize.model('kendaraans'));
console.log('Is User model registered:', User === sequelize.model('users'));
console.log('Is Pengendara model registered:', Pengendara === sequelize.model('pengendaras'));

sequelize.sync({ force: true }) // Set force to true if you want to drop the tables first
    .then(() => {
        console.log('Database synchronized successfully.');
        process.exit();
    })
    .catch((error: any) => {
        console.error('Error synchronizing the database:', error);
        process.exit(1);
    });