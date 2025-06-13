import { Router } from 'express';

import { validateBody } from '../utils/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

import { authenticate } from '../middlewares/authenticate.js';

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

authRouter.post('/refresh', ctrlWrapper(authControllers.refreshController));

authRouter.get(
  '/user-info',
  authenticate,
  ctrlWrapper(authControllers.getUserInfoController),
);

authRouter.post(
  '/logout',
  authenticate,
  ctrlWrapper(authControllers.logoutController),
);

export default authRouter;
