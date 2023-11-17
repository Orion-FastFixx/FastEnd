import router from './user.routes';
import userRoutes from './user.routes';
import initRolesRoutes from './initRole.routes';
import authenticationRoutes from './authentication.routes';

router.use('/user', userRoutes);
router.use('/auth', authenticationRoutes);
router.use('/init-roles', initRolesRoutes);



export const routes = router;