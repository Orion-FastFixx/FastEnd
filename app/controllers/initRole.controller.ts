import { Role } from "../models/role.models";

const defaultRoles = ["admin", "pengendara", "mitra"];

export const initializeRoles = async () => {
    try {
        await Promise.all(defaultRoles.map(async (roleName) => {
            const roleExists = await Role.findOne({ name: roleName });
            if (!roleExists) {
                const newRole = new Role({ name: roleName });
                await newRole.save();
                console.log(`Role ${roleName} created successfully.`);
            } else {
                console.log(`Role ${roleName} already exists.`);
            }
        }));
        console.log('Roles initialization completed.');
    } catch (error) {
        console.error('Error initializing roles:', error);
        process.exit(1);
    }
}