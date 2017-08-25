import { Router } from 'express';
import { loginHandler } from '../../controllers/auth/auth.controller';

const authRouter: Router = Router();

authRouter
  .post('/login', loginHandler);

export { authRouter };
