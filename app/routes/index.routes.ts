import router from './router';
import initRolesRoutes from './initRole.routes';
import authenticationRoutes from './authentication.routes';
import adminRoutes from './admin.routes';
import bengkelRoutes from './bengkel.routes';
import pengendaraRoutes from './pengendara.routes';


router.use('/admin', adminRoutes);
router.use('/auth', authenticationRoutes);
router.use('/init-roles', initRolesRoutes);
router.use('/bengkel', bengkelRoutes);
router.use('/pengendara', pengendaraRoutes);



export const routes = router;