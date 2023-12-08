import { Response } from "express";
import Bengkel from "../models/bengkel.models";
import Service from "../models/service.model";
import { Request as CustomRequest } from "../utils/types";
import Pengendara from "../models/pengendara.models";
import BengkelRating from "../models/bengkel.rating.models";
import { sequelize } from "../../db";

export const PengendaraController = {
    async getAllBengkel(req: CustomRequest, res: Response) {
        try {
            const user = req.userId;

            const pengendara: any = await Pengendara.findOne({ where: { user_id: user } });
            if (!pengendara) {
                return res.status(403).json({
                    message: "Require Pengendara Role!"
                });
            }

            const bengkel = await Bengkel.findAll({
                include: [
                    {
                        model: BengkelRating,
                        as: 'rating',
                        attributes: [
                            [sequelize.fn('ROUND', sequelize.fn('AVG', sequelize.col('bengkel_rating')), 1), 'average_rating'],
                            [sequelize.fn('COUNT', sequelize.col('review')), 'review_count']
                        ],
                    }
                ],
                attributes: { exclude: ['phone', 'deskripsi', 'pemilik_id', 'createdAt', 'updatedAt'] },
                group: ['bengkels.id'] // Adjust according to the models' relationships
            });

            return res.status(200).json({
                message: "Success get all bengkel",
                data: bengkel
            });

        } catch (error: any) {
            return res.status(500).json({ message: error.message || "Internal Server Error" });
        }
    },

    async getDetailBengkel(req: CustomRequest, res: Response) {
        try {
            const user = req.userId;

            const pengendara: any = await Pengendara.findOne({ where: { user_id: user } });
            if (!pengendara) {
                return res.status(403).json({
                    message: "Require Pengendara Role!"
                });
            }

            // Get bengkel_id from route parameters
            const bengkel_id = req.params.id;

            const bengkel = await Bengkel.findOne({
                where: { id: bengkel_id },
                include: [
                    {
                        // populate Services and BengkelService
                        model: Service,
                        as: 'services',
                        attributes: { exclude: ['createdAt', 'updatedAt'] },
                        through: {
                            attributes: ['harga'], // Include additional attributes from BengkelService
                            as: 'harga_layanan'
                        }
                    },
                    {
                        model: BengkelRating,
                        as: 'rating',
                        attributes: [
                            [sequelize.fn('ROUND', sequelize.fn('AVG', sequelize.col('bengkel_rating')), 1), 'average_rating'],
                            [sequelize.fn('COUNT', sequelize.col('review')), 'review_count']
                        ],
                    }
                ],
                attributes: { exclude: ['pemilik_id', 'createdAt', 'updatedAt'] },
                group: ['bengkels.id', 'services.id'] // Adjust according to the models' relationships

            });

            return res.status(200).json({
                message: "Success get detail bengkel",
                data: bengkel
            });

        } catch (error: any) {
            return res.status(500).json({ message: error.message || "Internal Server Error" });
        }
    },

    async addReviewBengkel(req: CustomRequest, res: Response) {
        try {
            const user = req.userId;

            const pengendara: any = await Pengendara.findOne({ where: { user_id: user } });
            if (!pengendara) {
                return res.status(403).json({
                    message: "Require Pengendara Role!"
                });
            }

            const { bengkel_rating, review, bengkel_id } = req.body;

            const existingReview = await BengkelRating.findOne({
                where: {
                    bengkel_id: bengkel_id,
                    pengendara_id: pengendara.id
                }
            });

            if (existingReview) {
                return res.status(403).json({
                    message: "You have already review this bengkel!"
                });
            }

            const ReviewBengkel = await BengkelRating.create({
                bengkel_rating,
                review,
                bengkel_id,
                pengendara_id: pengendara.id
            });

            return res.status(201).json({
                message: "Review Bengkel created successfully",
                data: ReviewBengkel
            });

        } catch (error: any) {
            return res.status(500).json({ message: error.message || "Internal Server Error" });
        }
    },

    async getDetailReviewBengkel(req: CustomRequest, res: Response) {
        try {
            const user = req.userId;

            const pengendara: any = await Pengendara.findOne({ where: { user_id: user } });
            if (!pengendara) {
                return res.status(403).json({
                    message: "Require Pengendara Role!"
                });
            }

            // Get bengkel_id from route parameters
            const bengkel_id = req.params.id;

            if (!bengkel_id) {
                return res.status(400).json({
                    message: "Bengkel id is required!"
                });
            }

            const ReviewBengkel = await BengkelRating.findAll({
                where: {
                    bengkel_id: bengkel_id,
                },
                include: [{
                    model: Pengendara,
                    as: 'pengendara',
                    attributes: ['nama', 'foto']
                }],
                attributes: { exclude: ['pengendara_id'] },
            });

            // Calculate the average rating and count of ratings
            const reviewSummary = await BengkelRating.findOne({
                where: { bengkel_id: bengkel_id },
                attributes: [
                    [sequelize.fn('ROUND', sequelize.fn('AVG', sequelize.col('bengkel_rating')), 1), 'average_rating'],
                    [sequelize.fn('COUNT', sequelize.col('bengkel_rating')), 'rating_count']
                ],
                raw: true
            });

            return res.status(200).json({
                message: "Success get all review bengkel",
                data: {
                    review_summary: reviewSummary,
                    review_all: ReviewBengkel
                }
            });

        } catch (error: any) {
            return res.status(500).json({ message: error.message || "Internal Server Error" });
        }
    },
}