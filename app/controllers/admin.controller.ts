import { Request, Response } from "express";
import User from "../models/user.models";

export const AdminController = {

    async getAllUser(req: Request, res: Response) {
        try {
            const user = await User.findAll({

            });

            res.status(200).json({
                message: "Success get all user",
                data: user
            });

        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    },
}