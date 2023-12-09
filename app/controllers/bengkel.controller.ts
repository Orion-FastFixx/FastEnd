import { Response } from "express";
import fs from "fs";
import multer from "multer";
import path from "path";
import AdminBengkel from "../models/admin.bengkel.model";
import Bengkel from "../models/bengkel.models";
import BengkelService from "../models/bengkel.service.model";
import Kendaraan from "../models/kendaraan.models";
import Order from "../models/order.model";
import Pengendara from "../models/pengendara.models";
import Service from "../models/service.model";
import { maxSize } from "../utils/multer";
import { ORDER_ACCEPTED_STATUS_ID, ORDER_CANCELED_STATUS_ID, ORDER_COMPLETED_STATUS_ID, ORDER_PAID_STATUS_ID } from "../utils/order.status";
import { Request as CustomRequest } from "../utils/types";

export const BengkelController = {
    async createBengkel(req: CustomRequest, res: Response) {
        try {
            const bengkelOwner = req.userId;

            const adminBengkel: any = await AdminBengkel.findOne({ where: { user_id: bengkelOwner } });
            if (!adminBengkel) {
                return res.status(403).json({
                    message: "Require Admin Bengkel Role!"
                });
            }

            const { nama_bengkel, phone_bengkel, alamat, lokasi, deskripsi, jenis_bengkel, spesialisasi_bengkel, is_open } = req.body;
            let foto_url: string[] = [];

            if (req.files) {
                const files = req.files as Express.Multer.File[];
                foto_url = files.map(file => {
                    const filename = path.basename(file.path); // Extract filename from path
                    return `${req.protocol}://${req.get("host")}/images/${filename}`;
                });
            }


            // check if bengkel already exist
            const bengkel: any = await Bengkel.findOne({ where: { nama_bengkel: nama_bengkel } });
            if (bengkel) {
                if (req.files) {
                    (req.files as Express.Multer.File[]).forEach((file: Express.Multer.File) => {
                        fs.unlinkSync(file.path); // Use the correct type for 'file'
                    });
                }

                return res.status(409).json({
                    message: "Bengkel already exist"
                });
            }

            const newBengkel = await Bengkel.create({
                nama_bengkel,
                phone_bengkel,
                alamat,
                lokasi,
                deskripsi,
                jenis_bengkel,
                spesialisasi_bengkel,
                is_open,
                foto_url: JSON.stringify(foto_url),
                pemilik_id: adminBengkel.id,
            });

            res.status(201).json({
                message: "Bengkel created successfully",
                data: newBengkel
            });

        } catch (error: any) {
            if (req.files) {
                (req.files as Express.Multer.File[]).forEach((file: Express.Multer.File) => {
                    fs.unlinkSync(file.path); // Use the correct type for 'file'
                });
            }
            // Check if the error is related to file size
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
        try {
            const bengkelOwner = req.userId;

            const adminBengkel: any = await AdminBengkel.findOne({ where: { user_id: bengkelOwner } });
            if (!adminBengkel) {
                return res.status(403).json({
                    message: "Require Admin Bengkel Role!"
                });
            }

            const { bengkel_id, layanan, harga } = req.body;

            const bengkel: any = await Bengkel.findByPk(bengkel_id);
            if (!bengkel) {
                return res.status(404).json({
                    message: "Bengkel not found"
                });
            }

            // Check if the adminBengkel is the owner of the bengkel
            if (bengkel.pemilik_id !== adminBengkel.id) {
                return res.status(403).json({
                    message: "Unauthorized: Only the Bengkel owner can add services"
                });
            }

            let services: any = await Service.findOne({ where: { layanan: layanan } });
            if (!services) {
                services = await Service.create({ layanan: layanan });
            }

            const bengkelService = await BengkelService.create({
                bengkel_id: bengkel.id,
                service_id: services.id,
                harga: harga
            });

            return res.status(201).json({
                message: "Layanan created successfully",
                data: bengkelService
            });

        } catch (error: any) {
            return res.status(500).json({ message: error.message || "Internal Server Error" });
        }
    },

    async getBengkelOrderService(req: CustomRequest, res: Response) {
        try {
            const bengkelOwner = req.userId;

            const adminBengkel: any = await AdminBengkel.findOne({ where: { user_id: bengkelOwner } });
            if (!adminBengkel) {
                return res.status(403).json({
                    message: "Require Admin Bengkel Role!"
                });
            }

            // fetch bengkel order
            const orders = await Order.findAll({
                where: {
                    bengkel_id: adminBengkel.id,
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

    // todo: pikirkan cara untuk membatalkan order yang sudah diterima jika melebihi waktu tertentu
    
    async acceptOrder(req: CustomRequest, res: Response) {
        try {
            const bengkelOwner = req.userId;

            const adminBengkel: any = await AdminBengkel.findOne({ where: { user_id: bengkelOwner } });
            if (!adminBengkel) {
                return res.status(403).json({
                    message: "Require Admin Bengkel Role!"
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
            const bengkelOwner = req.userId;

            const adminBengkel: any = await AdminBengkel.findOne({ where: { user_id: bengkelOwner } });
            if (!adminBengkel) {
                return res.status(403).json({
                    message: "Require Admin Bengkel Role!"
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
            const bengkelOwner = req.userId;

            const adminBengkel: any = await AdminBengkel.findOne({ where: { user_id: bengkelOwner } });
            if (!adminBengkel) {
                return res.status(403).json({
                    message: "Require Admin Bengkel Role!"
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