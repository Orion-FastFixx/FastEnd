import Role from "../models/role.models";
import { sequelize } from "../../db";
import { Request, Response } from "express"

const defaultRoles = ["Admin", "Pengendara", "Admin Bengkel", "Montir"];

export const initializeRoles = async (req: Request, res: Response) => {
    try {
        const transaction = await sequelize.transaction();
        let results = [];

        for (const roleName of defaultRoles) {
            const [role, created] = await Role.findOrCreate({
                where: { name: roleName },
                defaults: { name: roleName },
                transaction,
            });

            results.push({
                roleName: roleName,
                status: created ? 'created' : 'already exists',
                roleDetails: role
            });
        }
        await transaction.commit();

        return res.status(200).json({
            message: "Success initialize roles",
            data: results
        });

    } catch (error: any) {
        console.error("Error initializing roles:", error);
        return res.status(500).json({ message: error.message });
    }
}