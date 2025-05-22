import { Router } from 'express';

import { validateBody } from '../utils/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

import { authLoginSchema, authRegisterSchema } from '../validation/auth.js';

import * as authControllers from '../controllers/auth.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(authRegisterSchema),
  ctrlWrapper(authControllers.registerController),
);

authRouter.post(
  '/login',
  validateBody(authLoginSchema),
  ctrlWrapper(authControllers.loginController),
);

export default authRouter;
