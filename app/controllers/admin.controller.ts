import { Request, Response } from "express";
import User from "../models/user.models";
import Service from "../models/service.model";
import MontirRating from "../models/montir.rating.model";
import { sequelize } from "../../db";

export const AdminController = {

    async getAllMontir(req: Request, res: Response) {
        try {
            const montirs = await User.findAll({
                where: { role_id: 4 },
                include: [
                    {
                        model: MontirRating,
                        as: 'rating',
                        attributes: [
                            [sequelize.fn('ROUND', sequelize.fn('AVG', sequelize.col('montir_rating')), 1), 'average_rating'],
                            [sequelize.fn('COUNT', sequelize.col('review')), 'review_count']
                        ],
                    }
                ],
                attributes: { exclude: ['user_id', 'createdAt', 'updatedAt'] },
                group: ['montirs.id', 'services.id'] 
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