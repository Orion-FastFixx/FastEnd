import { Response } from "express";
import Bengkel from "../models/bengkel.models";
import Service from "../models/service.model";
import { Request as CustomRequest } from "../utils/types";
import Pengendara from "../models/pengendara.models";
import BengkelRating from "../models/bengkel.rating.models";
import { sequelize } from "../../db";
import MontirRating from "../models/montir.rating.model";
import Order from "../models/order.model";
import OrderService from "../models/order.service.model";
import BengkelService from "../models/bengkel.service.model";
import Payment from "../models/payment.model";
import { ORDER_CANCELED_STATUS_ID, ORDER_PAID_STATUS_ID, ORDER_PENDING_STATUS_ID } from "../utils/order.status";
import { PAYMENT_METHOD_CASH, PAYMENT_METHOD_TRANSFER } from "../utils/payment.method";

export const PengendaraController = {
    // feature Bengkel


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

    async orderBengkelService(req: CustomRequest, res: Response) {
        const transaction = await sequelize.transaction();

        try {
            const user = req.userId;

            const pengendara: any = await Pengendara.findOne({ where: { user_id: user } });
            if (!pengendara) {
                await transaction.rollback();
                return res.status(403).json({
                    message: "Require Pengendara Role!"
                });
            }

            const { bengkel_id, service_id, } = req.body;

            const newOrder: any = await Order.create({
                pengendara_id: pengendara.id,
                bengkel_id,
                order_status_id: ORDER_PENDING_STATUS_ID,
                transaction
            });

            // init total price
            let totalPrice = 0;

            // add admin fee
            const adminFee = 1000;

            for (const serviceId of service_id) {
                const bengkelService: any = await BengkelService.findOne({
                    where: {
                        bengkel_id: bengkel_id,
                        service_id: serviceId
                    }
                });

                if (!bengkelService) {
                    await transaction.rollback();
                    return res.status(400).json({
                        message: "Service not found!"
                    });
                }

                await OrderService.create({
                    order_id: newOrder.id,
                    service_id: serviceId,
                    price: bengkelService.harga
                });

                totalPrice += bengkelService.harga;
            }

            const totalPayment = totalPrice + adminFee;

            await newOrder.update({
                total_harga: totalPayment
            });

            await transaction.commit(); // Commit the transaction
            return res.status(201).json({
                message: "Order created successfully",
                data: newOrder
            });

        } catch (error: any) {
            await transaction.rollback(); // Rollback transaction if any errors were encountered
            return res.status(500).json({ message: error.message || "Internal Server Error" });
        }
    },

    async payBengkelService(req: CustomRequest, res: Response) {
        const transaction = await sequelize.transaction();

        try {
            const user = req.userId;

            const pengendara: any = await Pengendara.findOne({ where: { user_id: user } });
            if (!pengendara) {
                await transaction.rollback();
                return res.status(403).json({
                    message: "Require Pengendara Role!"
                });
            }

            const { order_id, payment_method_id } = req.body;
            // fetch order
            const order: any = await Order.findOne({
                where: {
                    id: order_id,
                    pengendara_id: pengendara.id
                },
                transaction
            });

            if (!order) {
                await transaction.rollback();
                return res.status(404).json({
                    message: "Order not found!"
                });
            }

            if (!payment_method_id) {
                await transaction.rollback();
                return res.status(400).json({
                    message: "Payment method is required!"
                });
            }

            if (payment_method_id == PAYMENT_METHOD_CASH) {
                await Payment.create({
                    order_id,
                    payment_method_id,
                    payment_status_id: 2,
                    transaction
                });
                order.order_status_id = ORDER_PAID_STATUS_ID;
                await order.save({ transaction });
            } else if (payment_method_id == PAYMENT_METHOD_TRANSFER) {
                await Payment.create({
                    order_id,
                    payment_method_id,
                    payment_status_id: 2,
                    transaction
                });
                order.order_status_id = ORDER_PAID_STATUS_ID;
                await order.save({ transaction });
            } else {
                await transaction.rollback();
                return res.status(400).json({
                    message: "Payment method not found!"
                });
            }

            await transaction.commit(); // Commit the transaction
            return res.status(201).json({
                message: "Payment created successfully",
            });

        } catch (error: any) {
            await transaction.rollback(); // Rollback transaction if any errors were encountered
            return res.status(500).json({ message: error.message || "Internal Server Error" });
        }
    },

    async cancelOrder(req: CustomRequest, res: Response) {
        try {
            const user = req.userId;

            const pengendara: any = await Pengendara.findOne({ where: { user_id: user } });
            if (!pengendara) {
                return res.status(403).json({
                    message: "Require Pengendara Role!"
                });
            }

            const order_id = req.params.orderId;

            const order: any = await Order.findOne({
                where: {
                    id: order_id,
                    pengendara_id: pengendara.id
                }
            });

            if (!order) {
                return res.status(404).json({
                    message: "Order not found!"
                });
            }

            order.order_status_id = ORDER_CANCELED_STATUS_ID;
            await order.save();

            return res.status(200).json({
                message: "Order cancelled",
                order
            });

        } catch (error: any) {
            return res.status(500).json({ message: error.message || "Internal Server Error" });
        }
    },

    // End feature Bengkel

    async addReviewMontir(req: CustomRequest, res: Response) {
        try {
            const user = req.userId;

            const pengendara: any = await Pengendara.findOne({ where: { user_id: user } });
            if (!pengendara) {
                return res.status(403).json({
                    message: "Require Pengendara Role!"
                });
            }

            const { montir_rating, review, montir_id } = req.body;

            const existingReview = await MontirRating.findOne({
                where: {
                    montir_id: montir_id,
                    pengendara_id: pengendara.id
                }
            });

            if (existingReview) {
                return res.status(403).json({
                    message: "You have already review this montir!"
                });
            }

            const ReviewMontir = await MontirRating.create({
                montir_rating,
                review,
                montir_id,
                pengendara_id: pengendara.id
            });

            return res.status(201).json({
                message: "Review Montir created successfully",
                data: ReviewMontir
            });

        } catch (error: any) {
            return res.status(500).json({ message: error.message || "Internal Server Error" });
        }
    },

    async getDetailReviewMontir(req: CustomRequest, res: Response) {
        try {
            const user = req.userId;

            const pengendara: any = await Pengendara.findOne({ where: { user_id: user } });
            if (!pengendara) {
                return res.status(403).json({
                    message: "Require Pengendara Role!"
                });
            }

            // Get montir_id from route parameters
            const montir_id = req.params.id;

            if (!montir_id) {
                return res.status(400).json({
                    message: "Montir id is required!"
                });
            }

            const ReviewMontir = await MontirRating.findAll({
                where: {
                    montir_id: montir_id,
                },
                include: [{
                    model: Pengendara,
                    as: 'pengendara',
                    attributes: ['nama', 'foto']
                }],
                attributes: { exclude: ['pengendara_id'] },
            });

            // Calculate the average rating and count of ratings
            const reviewSummary = await MontirRating.findOne({
                where: { montir_id: montir_id },
                attributes: [
                    [sequelize.fn('ROUND', sequelize.fn('AVG', sequelize.col('montir_rating')), 1), 'average_rating'],
                    [sequelize.fn('COUNT', sequelize.col('montir_rating')), 'rating_count']
                ],
                raw: true
            });

            return res.status(200).json({
                message: "Success get all review montir",
                data: {
                    review_summary: reviewSummary,
                    review_all: ReviewMontir
                }
            });
        } catch (error: any) {
            return res.status(500).json({ message: error.message || "Internal Server Error" });
        }
    },
}