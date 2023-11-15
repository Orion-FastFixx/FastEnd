import { 
    EdukasiController,
    EdukasiControllerById,
    saveContent,
    updateContent,
    deleteContent
 } from "../controllers/edukasi.controller";
import router from "./router";

router.get('/edukasi', EdukasiController.find);
router.get('/edukasi/:id', EdukasiControllerById.findId);
router.post('/edukasi', saveContent.createKonten );
router.patch('/edukasi/:id', updateContent.updateKonten);
router.delete('/edukasi/:id', deleteContent.deleteKonten )

export default router;