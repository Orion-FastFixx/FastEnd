import { EdukasiController } from "../controllers/edukasi.controller";
import router from "./router";

router.get('/edukasi', EdukasiController.find);
router.get('/edukasi/:id', EdukasiController.findId);
router.post('/edukasi', EdukasiController.createKonten );
router.patch('/edukasi/:id', EdukasiController.updateKonten);
router.delete('/edukasi/:id', EdukasiController.deleteKonten )

export default router;