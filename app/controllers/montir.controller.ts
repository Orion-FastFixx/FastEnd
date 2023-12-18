import { Response } from "express";
import fs from "fs";
import multer from "multer";
import { sequelize } from "../../db";
import path from "path";
import User from "../models/user.models";
import Admin from "../models/admin.models";
import Montir from "../models/montir.models";
import MontirService from "../models/montir.service.model";
import Kendaraan from "../models/kendaraan.models";
import Order from "../models/order.model";
import Pengendara from "../models/pengendara.models";
import Service from "../models/service.model";
import { maxSize } from "../utils/multer";
import { ORDER_ACCEPTED_STATUS_ID, ORDER_CANCELED_STATUS_ID, ORDER_COMPLETED_STATUS_ID, ORDER_PAID_STATUS_ID } from "../utils/order.status";
import { Request as CustomRequest } from "../utils/types";

export const MontirController = {
    async updateMontir(req: CustomRequest, res: Response) {
        try {
            const montirAdmin = req.userId;
    
            const admin: any = await Montir.findOne({ where: { user_id: montirAdmin } });
            if (!admin) {
                return res.status(403).json({
                    message: "Require Role!"
                });
            }
    
            const { nama, phone, deskripsi, jenis_montir, pengalaman, is_available } = req.body;
            let foto_url: string[] = [];
    
            if (req.files) {
                const files = req.files as Express.Multer.File[];
                foto_url = files.map(file => {
                    const filename = path.basename(file.path);
                    return `${req.protocol}://${req.get("host")}/images/${filename}`;
                });
            }

            const montir_id = req.params.montirId;

            if (!montir_id) {
                return res.status(400).json({
                    message: "Montir id is required"
                });
            }

            const montir: any = await Montir.findOne({ where: { montir_id : montir_id } });
            if (!montir) {
                return res.status(404).json({
                    message: "Montir not found"
                });
            }
            // Lakukan pemrosesan perubahan atribut montir di sini
            montir.nama = nama;
            montir.phone = phone;
            montir.deskripsi = deskripsi;
            montir.jenis_montir = jenis_montir;
            montir.pengalaman = pengalaman;
            montir.is_available = is_available;
            montir.foto_url = JSON.stringify(foto_url);
            
            await montir.save();            
    
            res.status(200).json({
                message: "Montir updated successfully",
                data: montir
            });
    
        } catch (error: any) {
            if (req.files) {
                (req.files as Express.Multer.File[]).forEach((file: Express.Multer.File) => {
                    fs.unlinkSync(file.path);
                });
            }
            
            if (error instanceof multer.MulterError && error.code === 'LIMIT_FILE_SIZE') {
                return res.status(413).json({
                    message: `One or more files are too large. Maximum file size allowed is ${maxSize}.`,
                    error: error
                });
            }
    
            return res.status(500).json({ message: error.message || "Internal Server Error" });
        }
    },
    

    async createLayanan(req: CustomRequest, res: Response) {
        const transaction = await sequelize.transaction();
        try {
            const montirOwner = req.userId;
            const montir: any = await Montir.findOne({ where: { user_id: montirOwner } });
    
            if (!montir) {
                await transaction.rollback();
                return res.status(403).json({
                    message: "Require Montir Role!"
                });
            }
    
            const montirId = montir.id;
            const montirown: any = await Montir.findByPk(montirId);
    
            if (!montirown) {
                await transaction.rollback();
                return res.status(404).json({
                    message: "Montir not found"
                });
            }
    
            const { harga } = req.body;

            const defaultLayanan = "CONSULTATION";
            let services: any = await Service.findOne({ where: { layanan: defaultLayanan } });
    
            if (!services) {
                services = await Service.create({ layanan: defaultLayanan }, { transaction });
            }
    
            let montirServiceExists = await MontirService.findOne({
                where: { montir_id: montirown.id }
            });
    
            if (!montirServiceExists) {
                const montirservice = await MontirService.create({
                    montir_id: montirown.id,
                    service_id: services.id,
                    harga: harga
                }, { transaction });
    
                await transaction.commit();
                return res.status(201).json({
                    message: "Layanan created successfully",
                    data: montirservice
                });
            } 
        } catch (error: any) {
            await transaction.rollback();
            return res.status(500).json({ message: error.message || "Internal Server Error" });
        }
    },
    

    async getMontirOrderService(req: CustomRequest, res: Response) {
        try {
            const montirOwner = req.userId;

            const montir: any = await Montir.findOne({ where: { user_id: montirOwner } });
            if (!montir) {
                return res.status(403).json({
                    message: "Require Role!"
                });
            }

            const orders = await Order.findAll({
                where: {
                    montir_id: montir.id,
                    order_status_id: ORDER_PAID_STATUS_ID
                },
                include: [
                    {
                        model: Pengendara,
                        as: "pengendara",
                        attributes: ["nama", "phone", "foto", "lokasi",],
                        include: [
                            {
                                model: Kendaraan,
                                as: "kendaraan",
                                attributes: ["nama_kendaraan", "jenis", "plat"],
                            }
                        ]
                    },
                    {
                        model: Service,
                        as: 'services',
                        attributes: { exclude: ['createdAt', 'updatedAt'] },
                        through: {
                            attributes: ['price']
                        }
                    }
                ],
                attributes: { exclude: ['pengendara_id', 'montir_id'] },
            });

            return res.status(200).json({
                message: "Montir order fetched successfully",
                data: orders
            });

        } catch (error: any) {
            return res.status(500).json({ message: error.message || "Internal Server Error" });
        }
    },

    async getDetailMontirOrderService(req: CustomRequest, res: Response) {
        try {
            const montirOwner = req.userId;

            const montir: any = await Montir.findOne({ where: { user_id: montirOwner } });
            if (!montir) {
                return res.status(403).json({
                    message: "Require Montir Role!"
                });
            }

            const order_id = req.params.orderId;

            if (!order_id) {
                return res.status(400).json({
                    message: "Order id is required"
                });
            }

            const order = await Order.findOne({
                where: {
                    id: order_id,
                },
                include: [
                    {
                        model: Service,
                        as: 'services',
                        attributes: { exclude: ['createdAt', 'updatedAt'] },
                        through: {
                            attributes: ['price']
                        }
                    }
                ],
                attributes: ['id', 'total_harga', 'order_status_id'],
            });

            return res.status(200).json({
                message: "Montir order fetched successfully",
                data: order
            });

        } catch (error: any) {
            return res.status(500).json({ message: error.message || "Internal Server Error" });
        }
    },
    
    async acceptMontirOrderService(req: CustomRequest, res: Response) {
        const transaction = await sequelize.transaction();

        try {
            const montirOwner = req.userId;

            const montir: any = await Montir.findOne({ where: { user_id: montirOwner } });
            if (!montir) {
                return res.status(403).json({
                    message: "Require Montir Role!"
                });
            }

            const order_id = req.params.orderId;
            const order: any = await Order.findByPk(order_id);
            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }

            if (order.order_status_id === ORDER_PAID_STATUS_ID) {
                // Assuming the 'status' field holds the status name or ID
                order.order_status_id = ORDER_ACCEPTED_STATUS_ID
                await order.save();
            } else {
                await transaction.rollback();
                if (order.order_status_id === ORDER_ACCEPTED_STATUS_ID) {
                    return res.status(409).json({ message: 'Order already accepted' });
                } else if (order.order_status_id === ORDER_COMPLETED_STATUS_ID) {
                    return res.status(409).json({ message: 'Order already completed' });
                } else if (order.order_status_id === ORDER_CANCELED_STATUS_ID) {
                    return res.status(409).json({ message: 'Order already cancelled' });
                }
            }

            await transaction.commit();
            return res.status(200).json({ message: 'Order accepted' });

        } catch (error: any) {
            return res.status(500).json({ message: error.message || "Internal Server Error" });
        }
    },

    async cancelMontirOrderService(req: CustomRequest, res: Response) {
        const transaction = await sequelize.transaction();

        try {
            const montirOwner = req.userId;

            const montir: any = await Montir.findOne({ where: { user_id: montirOwner } });
            if (!montir) {
                return res.status(403).json({
                    message: "Require Montir Role!"
                });
            }

            const order_id = req.params.orderId;
            const order: any = await Order.findByPk(order_id);
            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }

            if (order.order_status_id === ORDER_PAID_STATUS_ID) {
                // Assuming the 'status' field holds the status name or ID
                order.order_status_id = ORDER_CANCELED_STATUS_ID
                await order.save();
            } else {
                await transaction.rollback();
                if (order.order_status_id === ORDER_ACCEPTED_STATUS_ID) {
                    return res.status(409).json({ message: 'Order already accepted' });
                } else if (order.order_status_id === ORDER_COMPLETED_STATUS_ID) {
                    return res.status(409).json({ message: 'Order already completed' });
                } else if (order.order_status_id === ORDER_CANCELED_STATUS_ID) {
                    return res.status(409).json({ message: 'Order already cancelled' });
                }
            }

            await transaction.commit();
            return res.status(200).json({ message: 'Order cancelled' });

        } catch (error: any) {
            return res.status(500).json({ message: error.message || "Internal Server Error" });
        }
    },

    async completedMontirOrderService(req: CustomRequest, res: Response) {
        const transaction = await sequelize.transaction();

        try {
            const montirOwner = req.userId;

            const montir: any = await Montir.findOne({ where: { user_id: montirOwner } });
            if (!montir) {
                return res.status(403).json({
                    message: "Require Montir Role!"
                });
            }

            const order_id = req.params.orderId;
            const order: any = await Order.findByPk(order_id);
            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }

            if (order.order_status_id === ORDER_ACCEPTED_STATUS_ID) {
                // Assuming the 'status' field holds the status name or ID
                order.order_status_id = ORDER_COMPLETED_STATUS_ID
                await order.save();
            } else {
                await transaction.rollback();
                if (order.order_status_id === ORDER_ACCEPTED_STATUS_ID) {
                    return res.status(409).json({ message: 'Order already accepted' });
                } else if (order.order_status_id === ORDER_COMPLETED_STATUS_ID) {
                    return res.status(409).json({ message: 'Order already completed' });
                } else if (order.order_status_id === ORDER_CANCELED_STATUS_ID) {
                    return res.status(409).json({ message: 'Order already cancelled' });
                }
            }

            await transaction.commit();
            return res.status(200).json({ message: 'Order completed' });

        } catch (error: any) {
            return res.status(500).json({ message: error.message || "Internal Server Error" });
        }
    },

    async getCompletedMontirOrderService(req: CustomRequest, res: Response) {
        try {
            const montirOwner = req.userId;

            const montir: any = await Montir.findOne({ where: { user_id: montirOwner } });
            if (!montir) {
                return res.status(403).json({
                    message: "Require Montir Role!"
                });
            }

            // fetch bengkel order
            const orders = await Order.findAll({
                where: {
                    bengkel_id: montir.id,
                    order_status_id: ORDER_COMPLETED_STATUS_ID
                },
                include: [
                    {
                        model: Pengendara,
                        as: "pengendara",
                        attributes: ["nama", "phone", "foto", "lokasi",],
                        include: [
                            {
                                model: Kendaraan,
                                as: "kendaraan",
                                attributes: ["nama_kendaraan", "jenis", "plat"],
                            }
                        ]
                    },
                    {
                        model: Service,
                        as: 'services',
                        attributes: { exclude: ['createdAt', 'updatedAt'] },
                        through: {
                            attributes: ['price']
                        }
                    }
                ],
                attributes: { exclude: ['pengendara_id', 'bengkel_id', 'montir_id'] },
            });

            return res.status(200).json({
                message: "Bengkel order fetched successfully",
                data: orders
            });
        } catch (error: any) {
            return res.status(500).json({ message: error.message || "Internal Server Error" });
        }
    },

    async getCanceledMontirOrderService(req: CustomRequest, res: Response) {
        try {
            const montirOwner = req.userId;

            const montir: any = await Montir.findOne({ where: { user_id: montirOwner } });
            if (!montir) {
                return res.status(403).json({
                    message: "Require Montir Role!"
                });
            }

            // fetch bengkel order
            const orders = await Order.findAll({
                where: {
                    bengkel_id: montir.id,
                    order_status_id: ORDER_CANCELED_STATUS_ID
                },
                include: [
                    {
                        model: Pengendara,
                        as: "pengendara",
                        attributes: ["nama", "phone", "foto", "lokasi",],
                        include: [
                            {
                                model: Kendaraan,
                                as: "kendaraan",
                                attributes: ["nama_kendaraan", "jenis", "plat"],
                            }
                        ]
                    },
                    {
                        model: Service,
                        as: 'services',
                        attributes: { exclude: ['createdAt', 'updatedAt'] },
                        through: {
                            attributes: ['price']
                        }
                    }
                ],
                attributes: { exclude: ['pengendara_id', 'bengkel_id', 'montir_id'] },
            });

            return res.status(200).json({
                message: "Bengkel order fetched successfully",
                data: orders
            });
        } catch (error: any) {
            return res.status(500).json({ message: error.message || "Internal Server Error" });
        }
    },
}