"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EdukasiController = void 0;
const edukasi_model_1 = require("../models/edukasi.model");
//Tampilin data
exports.EdukasiController = {
    find(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const education = yield edukasi_model_1.Edukasi.find();
                res.json(education);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    },
    //Tampilin berdasarkan id
    findId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const edukasi = yield edukasi_model_1.Edukasi.findById(req.params.id);
                res.json(edukasi);
            }
            catch (error) {
                res.status(404).json({ message: error.message });
            }
        });
    },
    //Buat nambahin konten
    createKonten(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { jenisKonten, kendala, fotoKategori, konten } = (req.body);
            const edukasi = new edukasi_model_1.Edukasi({
                jenisKonten,
                kendala,
                fotoKategori,
                konten
            });
            try {
                const insertedukasi = yield edukasi.save();
                res.status(201).json(insertedukasi);
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        });
    },
    //Ubah konten
    updateKonten(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updateedukasi = yield edukasi_model_1.Edukasi.updateOne({ _id: req.params.id }, { $set: req.body });
                res.status(200).json(updateedukasi);
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        });
    },
    //Hapus konten
    deleteKonten(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deleteedukasi = yield edukasi_model_1.Edukasi.deleteOne({ _id: req.params.id });
                res.status(200).json(deleteedukasi);
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        });
    }
};
//# sourceMappingURL=edukasi.controller.js.map