import { Request, Response } from "express";
import User from "../models/user.models";

export const AdminController = {

    async getAllMontir(req: Request, res: Response) {
        try {
            const montirs = await User.findAll({
                where: { role_id: 4 },
            });

            res.status(200).json({
                message: "Success get all montir",
                data: montirs
            });

        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    },
}