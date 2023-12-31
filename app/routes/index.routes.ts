import router from './router';
import initRolesRoutes from './initConstantValue.routes';
import authenticationRoutes from './authentication.routes';
import adminRoutes from './admin.routes';
import bengkelRoutes from './bengkel.routes';
import montirRoutes from './montir.routes';
import pengendaraRoutes from './pengendara.routes';


router.use('/admin', adminRoutes);
router.use('/auth', authenticationRoutes);
router.use('/init-constant-value', initRolesRoutes);
router.use('/bengkel', bengkelRoutes);
router.use('/montir', montirRoutes);
router.use('/pengendara', pengendaraRoutes);


export const routes = router;