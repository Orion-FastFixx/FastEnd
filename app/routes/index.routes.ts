import router from './router';
import initRolesRoutes from './initRole.routes';
import authenticationRoutes from './authentication.routes';
import adminRoutes from './admin.routes';


router.use('/admin', adminRoutes);
router.use('/auth', authenticationRoutes);
router.use('/init-roles', initRolesRoutes);



export const routes = router;