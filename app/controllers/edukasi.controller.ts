import {Edukasi} from "../models/edukasi.model"
import { Request, Response } from "express";

//Tampilin data
export const EdukasiController = {
    async find(req: Request , res: Response){
        try {
            const education = await Edukasi.find();
            res.json(education)
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    },
    //Tampilin berdasarkan id
    async findId(req: Request , res: Response){
        try {
            const edukasi= await Edukasi.findById(req.params.id);
            res.json(edukasi)
        } catch (error: any) {
            res.status(404).json({ message: error.message });
        }
    },
    //Buat nambahin konten
    async createKonten(req: Request , res: Response){
        const { jenisKonten, kendala, fotoKategori, konten} = (req.body);
        const edukasi = new Edukasi({
            jenisKonten,
            kendala,
            fotoKategori,
            konten
        });
        try {
            const insertedukasi = await edukasi.save();
            res.status(201).json(insertedukasi)
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    },
    //Ubah konten
    async updateKonten(req: Request , res: Response){
        try {
            const updateedukasi = await Edukasi.updateOne({_id:req.params.id}, {$set: req.body});
            res.status(200).json(updateedukasi)
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    },
    //Hapus konten
    async deleteKonten(req: Request , res: Response){
        try {
            const deleteedukasi = await Edukasi.deleteOne({_id:req.params.id});
            res.status(200).json(deleteedukasi)
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
};