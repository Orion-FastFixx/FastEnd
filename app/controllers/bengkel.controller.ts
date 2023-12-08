import { Response } from "express"
import { Request as CustomRequest } from "../utils/types";
import Bengkel from "../models/bengkel.models";
import AdminBengkel from "../models/admin.bengkel.model";
import Service from "../models/service.model";
import BengkelService from "../models/bengkel.service.model";
import path from "path";
import multer from "multer";
import { maxSize } from "../utils/multer";

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
}