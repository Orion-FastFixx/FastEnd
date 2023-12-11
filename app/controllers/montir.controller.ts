import { Response } from "express";
import fs from "fs";
import multer from "multer";
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
    // async createMontir(req: CustomRequest, res: Response) {
    //     try {
    //         const montirAdmin = req.userId;

    //         const admin: any = await AdminMontir.findOne({ where: { user_id: montirAdmin } });
    //         if (!admin) {
    //             return res.status(403).json({
    //                 message: "Require Role!"
    //             });
    //         }

    //         const { nama, phone, deskripsi, jenis_montir, pengalaman, is_avaible } = req.body;
    //         let foto_url: string[] = [];

    //         if (req.files) {
    //             const files = req.files as Express.Multer.File[];
    //             foto_url = files.map(file => {
    //                 const filename = path.basename(file.path); // Extract filename from path
    //                 return `${req.protocol}://${req.get("host")}/images/${filename}`;
    //             });
    //         }


    //         // check if bengkel already exist
    //         const montirs: any = await Montir.findOne({ where: { nama : nama } });
    //         if (montirs) {
    //             if (req.files) {
    //                 (req.files as Express.Multer.File[]).forEach((file: Express.Multer.File) => {
    //                     fs.unlinkSync(file.path); // Use the correct type for 'file'
    //                 });
    //             }

    //             return res.status(409).json({
    //                 message: "Montir already exist"
    //             });
    //         }

    //         const newMontir = await Montir.create({
    //             nama,
    //             phone,
    //             deskripsi,
    //             jenis_montir,
    //             pengalaman,
    //             is_avaible,
    //             foto_url: JSON.stringify(foto_url),
    //             user_id: admin.id,
    //         });

    //         res.status(201).json({
    //             message: "Montir created successfully",
    //             data: newMontir
    //         });

    //     } catch (error: any) {
    //         if (req.files) {
    //             (req.files as Express.Multer.File[]).forEach((file: Express.Multer.File) => {
    //                 fs.unlinkSync(file.path); // Use the correct type for 'file'
    //             });
    //         }
    //         // Check if the error is related to file size
    //         if (error instanceof multer.MulterError && error.code === 'LIMIT_FILE_SIZE') {
    //             return res.status(413).json({
    //                 message: `One or more files are too large. Maximum file size allowed is ${maxSize}.`,
    //                 error: error
    //             });
    //         }

    //         return res.status(500).json({ message: error.message || "Internal Server Error" });
    //     }
    // },

    async createLayanan(req: CustomRequest, res: Response) {
        try {
            const montirOwner = req.userId;

            const montir: any = await Montir.findOne({ where: { user_id: montirOwner } });
            if (!montir) {
                return res.status(403).json({
                    message: "Require Montir Role!"
                });
            }

            const { montir_id, harga, layanan  } = req.body;

            const montirown: any = await Montir.findByPk(montir_id);
            if (!montirown) {
                return res.status(404).json({
                    message: "Montir not found"
                });
            }

            if (montirown.user_id !== montir.id) {
                return res.status(403).json({
                    message: "Unauthorized: Only the Montir can add services"
                });
            }

            const montirServiceExists = await MontirService.findOne({
                where: { montir_id: montir.id }
            });
            
            if (montirServiceExists) {
                return res.status(409).json({
                    message: "Layanan already created for this Montir"
                });
            }

            let services: any = await Service.findOne({ where: { layanan: layanan  } });
            if (!services) {
            
                services = await Service.create({ layanan: layanan });
            } else {
            
                return res.status(409).json({
                    message: "Layanan already exists"
                });
            }

            const montirservice = await MontirService.create({
                montir_id: montir.id,
                service_id: services.id,
                harga: harga
            });

            return res.status(201).json({
                message: "Layanan created successfully",
                data: montirservice
            });

        } catch (error: any) {
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

            // fetch bengkel order
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

    // todo: pikirkan cara untuk membatalkan order yang sudah diterima jika melebihi waktu tertentu
    
    async acceptOrder(req: CustomRequest, res: Response) {
        try {
            const montirOwner = req.userId;

            const montir: any = await Montir.findOne({ where: { user_id: montirOwner } });
            if (!montir) {
                return res.status(403).json({
                    message: "Require Admin Montir Role!"
                });
            }

            const order_id = req.params.orderId;
            const order: any = await Order.findByPk(order_id);
            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }

            // Assuming the 'status' field holds the status name or ID
            order.order_status_id = ORDER_ACCEPTED_STATUS_ID
            await order.save();

            return res.status(200).json({ message: 'Order accepted' });

        } catch (error: any) {
            return res.status(500).json({ message: error.message || "Internal Server Error" });
        }
    },

    async cancelOrder(req: CustomRequest, res: Response) {
        try {
            const montirOwner = req.userId;

            const montir: any = await Montir.findOne({ where: { user_id: montirOwner } });
            if (!montir) {
                return res.status(403).json({
                    message: "Require Montir Bengkel Role!"
                });
            }

            const order_id = req.params.orderId;
            const order: any = await Order.findByPk(order_id);
            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }

            // Assuming the 'status' field holds the status name or ID
            order.order_status_id = ORDER_CANCELED_STATUS_ID
            await order.save();

            return res.status(200).json({ message: 'Order cancelled' });

        } catch (error: any) {
            return res.status(500).json({ message: error.message || "Internal Server Error" });
        }
    },

    async completedOrder(req: CustomRequest, res: Response) {
        try {
            const montirOwner = req.userId;

            const montir: any = await Montir.findOne({ where: { user_id: montirOwner } });
            if (!montir) {
                return res.status(403).json({
                    message: "Require Admin Montir Role!"
                });
            }

            const order_id = req.params.orderId;
            const order: any = await Order.findByPk(order_id);
            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }

            // Assuming the 'status' field holds the status name or ID
            order.order_status_id = ORDER_COMPLETED_STATUS_ID
            await order.save();

            return res.status(200).json({ message: 'Order completed' });

        } catch (error: any) {
            return res.status(500).json({ message: error.message || "Internal Server Error" });
        }
    },
}