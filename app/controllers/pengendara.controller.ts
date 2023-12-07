import { Response } from "express";
import Bengkel from "../models/bengkel.models";
import Service from "../models/service.model";
import { Request as CustomRequest } from "../types/types";

export const PengendaraController = {
    async getAllBengkel(req: CustomRequest, res: Response) {
        try {

            const bengkel = await Bengkel.findAll({
                include: [{
                    model: Service,
                    as: 'layanan',
                    attributes: { exclude: ['createdAt', 'updatedAt'] },
                    through: {
                        attributes: ['harga'], // Include additional attributes from BengkelService
                        as: 'harga'
                    }
                }],
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            });

            return res.status(200).json({
                message: "Success get all bengkel",
                data: bengkel
            });

        } catch (error: any) {
            return res.status(500).json({ message: error.message || "Internal Server Error" });
        }
    },
}