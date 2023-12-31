import { Response } from "express";
import Bengkel from "../models/bengkel.models";
import Service from "../models/service.model";
import { Request as CustomRequest } from "../utils/types";
import Montir from '../models/montir.models';
import Pengendara from "../models/pengendara.models";
import BengkelRating from "../models/bengkel.rating.models";
import { sequelize } from "../../db";
import MontirRating from "../models/montir.rating.model";
import Order from "../models/order.model";
import OrderService from "../models/order.service.model";
import BengkelService from "../models/bengkel.service.model";
import Payment from "../models/payment.model";
import { ORDER_CANCELED_STATUS_ID, ORDER_COMPLETED_STATUS_ID, ORDER_PAID_STATUS_ID, ORDER_PENDING_STATUS_ID } from "../utils/order.status";
import { PAYMENT_METHOD_CASH, PAYMENT_METHOD_TRANSFER } from "../utils/payment.method";
import { PAYMENT_PAID_STATUS_ID } from "../utils/payment.status";
import Kendaraan from "../models/kendaraan.models";
import path from "path";
import MontirService from "../models/montir.service.model";
import Education from "../models/edukasi.models";

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

            if (!bengkel_id) {
                return res.status(400).json({
                    message: "Bengkel id is required!"
                });
            }

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

            const { bengkel_rating, review, bengkel_id } = req.body;

            const hasOrder = await Order.findOne({
                where: {
                    bengkel_id: bengkel_id,
                    pengendara_id: pengendara.id,
                    order_status_id: ORDER_COMPLETED_STATUS_ID
                },
            });

            if (!hasOrder) {
                await transaction.rollback();
                return res.status(403).json({
                    message: "Review not allowed. You must completed order services from this bengkel first."
                });
            }

            const existingReview = await BengkelRating.findOne({
                where: {
                    bengkel_id: bengkel_id,
                    pengendara_id: pengendara.id
                }
            });

            if (existingReview) {
                await transaction.rollback();
                return res.status(403).json({
                    message: "You have already review this bengkel!"
                });
            }

            const ReviewBengkel = await BengkelRating.create({
                bengkel_rating,
                review,
                bengkel_id,
                pengendara_id: pengendara.id,
                transaction
            });

            await transaction.commit(); // Commit the transaction
            return res.status(201).json({
                message: "Review Bengkel created successfully",
                data: ReviewBengkel
            });

        } catch (error: any) {
            await transaction.rollback(); // Rollback transaction if any errors were encountered
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


            const { bengkel_id, service_id, precise_location, fullName, complaint } = req.body;

            
            // fetch order to check if user already have order
            const hasOrder = await Order.findOne({
                where: {
                    pengendara_id: pengendara.id,
                    bengkel_id: bengkel_id,
                    order_status_id: ORDER_PENDING_STATUS_ID
                }
            });

            if (hasOrder) {
                await transaction.rollback();
                return res.status(403).json({
                    message: "You already have pending order!"
                });
            }

            // init total price
            let totalPrice = 0;

            // add admin fee
            const adminFee = 1000;

            // store service price
            let servicePrice: any = [];

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
                totalPrice += bengkelService.harga;
                servicePrice[serviceId] = bengkelService.harga;
            }

            const newOrder: any = await Order.create({
                additional_info: { precise_location, fullName, complaint },
                pengendara_id: pengendara.id,
                bengkel_id,
                order_status_id: ORDER_PENDING_STATUS_ID,
                transaction
            });

            for (const serviceId of service_id) {
                await OrderService.create({
                    order_id: newOrder.id,
                    service_id: serviceId,
                    price: servicePrice[serviceId],
                    transaction
                });
            }

            const totalPayment = totalPrice + adminFee;

            await newOrder.update({
                total_harga: totalPayment
            });


            const completeOrder: any = await Order.findOne({
                where: { id: newOrder.id },
                include: [{
                    model: Service,
                    as: 'services',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    },
                    through: {
                        attributes: ['price']
                    }
                }],
                transaction
            });

            if (completeOrder) {
                completeOrder.total_harga = parseInt(completeOrder.total_harga);

                completeOrder.services.forEach((service: any) => {
                    service.order_services.price = parseInt(service.order_services.price);
                });
            }


            await transaction.commit(); // Commit the transaction
            return res.status(201).json({
                message: "Order created successfully",
                data: completeOrder
            });

        } catch (error: any) {
            await transaction.rollback(); // Rollback transaction if any errors were encountered
            return res.status(500).json({ message: error.message || "Internal Server Error" });
        }
    },

    // End feature Bengkel

    // Start feature Montir

    async getAllMontir(req: CustomRequest, res: Response) {
        try {

            const user = req.userId;

            const pengendara: any = await Pengendara.findOne({ where: { user_id: user } });
            if (!pengendara) {
                return res.status(403).json({
                    message: "Require Pengendara Role!"
                });
            }

            const montirs = await Montir.findAll({
                include: [
                    {
                        // populate Services and MontirService
                        model: Service,
                        as: 'services',
                        attributes: { exclude: ['createdAt', 'updatedAt'] },
                        through: {
                            attributes: ['harga'], // Include additional attributes from MontirService
                            as: 'harga_layanan'
                        }
                    },
                    {
                        model: MontirRating,
                        as: 'rating',
                        attributes: [
                            [sequelize.fn('ROUND', sequelize.fn('AVG', sequelize.col('montir_rating')), 1), 'average_rating'],
                            [sequelize.fn('COUNT', sequelize.col('review')), 'review_count']
                        ],

                    }
                    
                ],
                attributes: { exclude: ['phone', 'deskripsi', 'user_id', 'createdAt', 'updatedAt'],
                            include: ['is_available'], },
                group: ['montirs.id', 'services.id'] // Adjust according to the models' relationships
            });

            res.status(200).json({
                message: "Success get all montir",
                data: montirs
            });

        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    },

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

    async orderMontirService(req: CustomRequest, res: Response) {
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

            const { montir_id, service_id } = req.body;

            // init total price
            let totalPrice = 0;

            // add admin fee
            const adminFee = 1000;

            // store service price
            let servicePrice: any = [];

            for (const serviceId of service_id) {
                const montirService: any = await MontirService.findOne({
                    where: {
                        montir_id: montir_id,
                        service_id: serviceId
                    }
                });

                if (!montirService) {
                    await transaction.rollback();
                    return res.status(400).json({
                        message: "Service not found!"
                    });
                }
                totalPrice += montirService.harga;
                servicePrice[serviceId] = montirService.harga;
            }

            const newOrder: any = await Order.create({
                additional_info: { },
                pengendara_id: pengendara.id,
                montir_id,
                order_status_id: ORDER_PENDING_STATUS_ID,
                transaction
            });

            for (const serviceId of service_id) {
                await OrderService.create({
                    order_id: newOrder.id,
                    service_id: serviceId,
                    price: servicePrice[serviceId],
                    transaction
                });
            }

            const totalPayment = totalPrice + adminFee;

            await newOrder.update({
                total_harga: totalPayment
            });

            const completeOrder: any = await Order.findOne({
                where: { id: newOrder.id },
                include: [{
                    model: Service,
                    as: 'services',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    },
                    through: {
                        attributes: ['price']
                    }
                }],
                transaction
            });

            await transaction.commit(); // Commit the transaction
            return res.status(201).json({
                message: "Order created successfully",
                data: completeOrder
            });

        } catch (error: any) {
            await transaction.rollback(); // Rollback transaction if any errors were encountered
            return res.status(500).json({ message: error.message || "Internal Server Error" });
        }
    },

    // End feature Montir

    // Start feature order

    async payOrderService(req: CustomRequest, res: Response) {
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

            const paidOrder = await Payment.findOne({
                where: {
                    order_id: order_id,
                    payment_status_id: PAYMENT_PAID_STATUS_ID,
                }
            });

            if (!order) {
                await transaction.rollback();
                return res.status(404).json({
                    message: "Order not found!"
                });
            }

            if (paidOrder) {
                await transaction.rollback();
                return res.status(400).json({
                    message: "Order already paid!"
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
                    payment_status_id: PAYMENT_PAID_STATUS_ID,
                    transaction
                });
                order.order_status_id = ORDER_PAID_STATUS_ID;
                await order.save({ transaction });
            } else if (payment_method_id == PAYMENT_METHOD_TRANSFER) {
                await Payment.create({
                    order_id,
                    payment_method_id,
                    payment_status_id: PAYMENT_PAID_STATUS_ID,
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

            const order_id = req.params.orderId;

            if (!order_id) {
                await transaction.rollback();
                return res.status(400).json({
                    message: "Order id is required!"
                });
            }

            const order: any = await Order.findOne({
                where: {
                    id: order_id,
                    pengendara_id: pengendara.id,
                    transaction
                }
            });

            if (!order) {
                await transaction.rollback();
                return res.status(404).json({
                    message: "Order not found!"
                });
            }

            order.order_status_id = ORDER_CANCELED_STATUS_ID;
            await order.save();

            await transaction.commit(); // Commit the transaction
            return res.status(200).json({
                message: "Order cancelled",
                order
            });

        } catch (error: any) {
            await transaction.rollback(); // Rollback transaction if any errors were encountered
            return res.status(500).json({ message: error.message || "Internal Server Error" });
        }
    },

    async getOrderService(req: CustomRequest, res: Response) { 
        try {
            const user = req.userId;

            const pengendara: any = await Pengendara.findOne({ where: { user_id: user } });
            if (!pengendara) {
                return res.status(403).json({
                    message: "Require Pengendara Role!"
                });
            }

            // fetch bengkel order
            const orders = await Order.findAll({
                where: {
                    pengendara_id: pengendara.id,
                },
                include: [{
                    model: Service,
                    as: 'services',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    },
                    through: {
                        attributes: ['price']
                    }
                },
                {
                    model: Montir,
                    as: 'montir',
                    attributes: ['nama'] // Replace with the actual attribute name in your Montir model
                },
                {
                    model: Bengkel,
                    as: 'bengkel',
                    attributes: ['nama_bengkel'] // Replace with the actual attribute name in your Bengkel model
                }
            ],

                attributes: ['id', 'additional_info', 'order_status_id', 'createdAt', 'updatedAt'],
            });

            return res.status(200).json({
                message: "Order fetched successfully",
                data: orders
            });

        } catch (error: any) {
            return res.status(500).json({ message: error.message || "Internal Server Error" });
        }
    },

    // End feature order

    // Start feature education
    async getAllEducation(req: CustomRequest, res: Response) {
            try {
                const user = req.userId;

                const pengendara: any = await Pengendara.findOne({ where: { user_id: user } });
                if (!pengendara) {
                    return res.status(403).json({
                        message: "Require Pengendara Role!"
                    });
                }

                const content = await Education.findAll({
    
                });
    
                res.status(200).json({
                    message: "Success get all content",
                    data: content
                });
    
            } catch (error: any) {
                res.status(500).json({ message: error.message });
            }
    },

    async getDetailEducation(req: CustomRequest, res: Response) {
            try {
                const user = req.userId;

                const pengendara: any = await Pengendara.findOne({ where: { user_id: user } });
                if (!pengendara) {
                    return res.status(403).json({
                        message: "Require Pengendara Role!"
                    });
                }

                const content_id = req.params.id;

                if (!content_id) {
                    return res.status(400).json({
                        message: "Education id is required!"
                    });
                }

                const content = await Education.findOne({
                    where: { id: content_id },
                });
    
                res.status(200).json({
                    message: "Success get the content",
                    data: content
                });
    
            } catch (error: any) {
                res.status(500).json({ message: error.message });
            }
    },
    
    // End feature education

    // feature account setting

    async getAllKendaraan(req: CustomRequest, res: Response) {
        try {
            const user = req.userId;

            const pengendara: any = await Pengendara.findOne({ where: { user_id: user } });
            if (!pengendara) {
                return res.status(403).json({
                    message: "Require Pengendara Role!"
                });
            }

            const kendaraan = await Kendaraan.findAll({
                where: {
                    pengendara_id: pengendara.id
                },
                attributes: ['nama_kendaraan'],
            });

            if (!kendaraan) {
                return res.status(404).json({
                    message: "Kendaraan not found!"
                });
            }

            return res.status(200).json({
                message: "Success get all kendaraan",
                data: kendaraan
            });
        } catch (error: any) {
            return res.status(500).json({ message: error.message || "Internal Server Error" });
        }
    },

    async addKendaraan(req: CustomRequest, res: Response) {
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

            const { nama_kendaraan, jenis, tahun_kendaraan, plat } = req.body;

            const newKendaraan = await Kendaraan.create({
                nama_kendaraan,
                jenis,
                tahun_kendaraan,
                plat,
                pengendara_id: pengendara.id,
                transaction
            });

            await transaction.commit(); // Commit the transaction
            return res.status(201).json({
                message: "Kendaraan created successfully",
                data: newKendaraan
            });

        } catch (error: any) {
            await transaction.rollback(); // Rollback transaction if any errors were encountered
            return res.status(500).json({ message: error.message || "Internal Server Error" });
        }
    },

    async updateKendaraan(req: CustomRequest, res: Response) {
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

            const { nama_kendaraan, jenis, tahun_kendaraan, plat } = req.body;

            const kendaraanId = req.params.id;

            if (!kendaraanId) {
                await transaction.rollback();
                return res.status(400).json({
                    message: "Kendaraan id is required!"
                });
            }

            const kendaraan: any = await Kendaraan.findOne({
                where: {
                    id: kendaraanId,
                    pengendara_id: pengendara.id
                },
                transaction
            });

            if (!kendaraan) {
                await transaction.rollback();
                return res.status(404).json({
                    message: "Kendaraan not found!"
                });
            }

            kendaraan.nama_kendaraan = nama_kendaraan;
            kendaraan.jenis = jenis;
            kendaraan.tahun_kendaraan = tahun_kendaraan;
            kendaraan.plat = plat;

            await kendaraan.save({ transaction });

            await transaction.commit(); // Commit the transaction

            return res.status(200).json({
                message: "Kendaraan updated successfully",
                data: kendaraan
            });
        } catch (error: any) {
            await transaction.rollback(); // Rollback transaction if any errors were encountered
            return res.status(500).json({ message: error.message || "Internal Server Error" });
        }
    },

    async deleteKendaraan(req: CustomRequest, res: Response) {
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

            const kendaraanId = req.params.id;

            if (!kendaraanId) {
                await transaction.rollback();
                return res.status(400).json({
                    message: "Kendaraan id is required!"
                });
            }

            const kendaraan: any = await Kendaraan.findOne({
                where: {
                    id: kendaraanId,
                    pengendara_id: pengendara.id
                },
                transaction
            });

            if (!kendaraan) {
                await transaction.rollback();
                return res.status(404).json({
                    message: "Kendaraan not found!"
                });
            }

            await kendaraan.destroy({ transaction });

            await transaction.commit(); // Commit the transaction

            return res.status(200).json({
                message: "Kendaraan deleted successfully",
            });

        } catch (error: any) {
            await transaction.rollback(); // Rollback transaction if any errors were encountered
            return res.status(500).json({ message: error.message || "Internal Server Error" });
        }
    },

    async updateProfilePengendara(req: CustomRequest, res: Response) {
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

            const { nama, phone, lokasi } = req.body;

            const placeHolderImgPath = `${req.protocol}://${req.get("host")}/placeholder/user_placeholder.png`
            let fotoUrl = placeHolderImgPath; // Default to placeholder
            if (req.file) {
                const filename = path.basename(req.file.path); // Extract filename from path
                fotoUrl = `${req.protocol}://${req.get("host")}/images/${filename}`;
            }

            const newLokasi = lokasi ? lokasi : null;

            pengendara.nama = nama;
            pengendara.foto = fotoUrl;
            pengendara.phone = phone;
            pengendara.lokasi = newLokasi;

            await pengendara.save({ transaction });

            await transaction.commit(); // Commit the transaction

            return res.status(200).json({
                message: "Profile updated successfully",
                data: pengendara
            });

        } catch (error: any) {
            await transaction.rollback(); // Rollback transaction if any errors were encountered
            return res.status(500).json({ message: error.message || "Internal Server Error" });
        }
    },

    // End feature account setting
}