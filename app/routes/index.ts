import { Router } from 'express';
import authRoutes from './v1/auth';

const router = Router();

// register routes here using ( router.use(path, routeHandler) )

router.use('/auth', authRoutes);

export default router;