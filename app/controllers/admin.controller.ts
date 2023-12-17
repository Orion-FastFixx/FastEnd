import { Request, Response } from "express";
import { Request as CustomRequest } from "../utils/types";
import User from "../models/user.models";
import multer from "multer";
import path from "path";
import fs from "fs";
import { maxSize } from "../utils/multer";
import Admin from "../models/admin.models";
import Montir from "../models/montir.models";
import Bengkel from "../models/bengkel.models";
import Education from "../models/edukasi.models";

export const AdminController = {

    async getAllMontir(req: CustomRequest, res: Response) {
        try {
            const superAdmin = req.userId;
            const admin: any = await Admin.findOne({ where: { user_id: superAdmin } });
    
            if (!admin) {
                return res.status(403).json({
                    message: "Require Admin Role!"
                });
            }
            const montir = await Montir.findAll({

            });

            res.status(200).json({
                message: "Success get all montir",
                data: montir
            });

        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    },

    async getAllBengkel(req: CustomRequest, res: Response) {
        try {
            const superAdmin = req.userId;
            const admin: any = await Admin.findOne({ where: { user_id: superAdmin } });
    
            if (!admin) {
                return res.status(403).json({
                    message: "Require Admin Role!"
                });
            }
            const bengkel = await Bengkel.findAll({

            });

            res.status(200).json({
                message: "Success get all montir",
                data: bengkel
            });

        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    },

    // create new education
    async createEducation(req: CustomRequest, res: Response) {
            try {
                const superAdmin = req.userId;
                const admin: any = await Admin.findOne({ where: { user_id: superAdmin } });
        
                if (!admin) {
                    return res.status(403).json({
                        message: "Require Admin Role!"
                    });
                }
        
                const { judul, jenis_kendaraan, kategori, sub_judul, isi_konten } = req.body;
                console.log(req.body); 
    
                let foto_url: string[] = [];
    
                if (req.files) {
                    const files = req.files as Express.Multer.File[];
                    foto_url = files.map(file => {
                        const filename = path.basename(file.path); 
                        return `${req.protocol}://${req.get("host")}/images/${filename}`;
                    });
                }
    
                const newEducation = await Education.create({
                    judul,
                    jenis_kendaraan,
                    kategori,
                    sub_judul,
                    isi_konten,
                    foto_url: JSON.stringify(foto_url),
                    user_id: admin.id,
                });            
    
                return res.status(201).json({
                    message: "Education created successfully",
                    data: newEducation
                });
                
            }
            catch (error: any) {
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
    
    // show all content
    async getAllContent(req: CustomRequest, res: Response) {
            try {
                const superAdmin = req.userId;
                const admin: any = await Admin.findOne({ where: { user_id: superAdmin } });
        
                if (!admin) {
                    return res.status(403).json({
                        message: "Require Admin Role!"
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
    
    // edit content
    async updateContent(req: CustomRequest, res: Response) {
            try {
                const superAdmin = req.userId;
                const admin: any = await Admin.findOne({ where: { user_id: superAdmin } });
        
                if (!admin) {
                    return res.status(403).json({
                        message: "Require Admin Role!"
                    });
                }
        
                const { judul, jenis_kendaraan, kategori, sub_judul, isi_konten } = req.body;
                let foto_url: string[] = [];
        
                if (req.files) {
                    const files = req.files as Express.Multer.File[];
                    foto_url = files.map(file => {
                        const filename = path.basename(file.path);
                        return `${req.protocol}://${req.get("host")}/images/${filename}`;
                    });
                }

                const content_id = req.params.id;

                if (!content_id) {
                    return res.status(400).json({
                        message: "Education id is required!"
                    });
                }
    
                const content: any = await Education.findOne({ where: { content_id : content_id } });
                if (!content) {
                    return res.status(404).json({
                        message: "Content not found"
                    });
                }
                // Lakukan pemrosesan perubahan atribut montir di sini
                content.judul = judul;
                content.jenis_kendaraan = jenis_kendaraan;
                content.kategori = kategori;
                content.sub_judul = sub_judul;
                content.isi_konten = isi_konten;
    
                await content.save();            
        
                res.status(200).json({
                    message: "Content updated successfully",
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

    // delete content
    async deleteContent(req: CustomRequest, res: Response) {
         try {
                const superAdmin = req.userId;
                const admin: any = await Admin.findOne({ where: { user_id: superAdmin } });

                if (!admin) {
                return res.status(403).json({
                message: "Require Admin Role!"
                });
                }

                const { judul } = req.body;

                const content: any = await Education.findOne({ where: { judul: judul } });
                if (!content) {
                return res.status(404).json({
                message: "Content not found"
                });
                }

                await content.destroy();

                res.status(200).json({
                message: "Content deleted successfully",
                });

                } catch (error: any) {
                return res.status(500).json({
                message: error.message || "Internal Server Error"
                });
             }
    }
}