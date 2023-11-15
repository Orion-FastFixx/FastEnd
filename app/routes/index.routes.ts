import router from './user.routes';
import userRoutes from './user.routes';
import edukasiRoutes from './edukasi.routes';

router.use('/user', userRoutes);

router.use('/edukasi', edukasiRoutes);

export const routes = router;