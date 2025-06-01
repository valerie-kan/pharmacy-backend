import { Router } from 'express';

import * as controllers from '../controllers/cart.js';
import { placeOrderController } from '../controllers/orders.js';

import { authenticate } from '../middlewares/authenticate.js';
import { isValidId } from '../middlewares/isValidId.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../utils/validateBody.js';

import { cartAddSchema, cartUpdateSchema } from '../validation/cart.js';
import { placeOrderSchema } from '../validation/orders.js';

const cartRouter = Router();

cartRouter.use(authenticate);

cartRouter.get('/', ctrlWrapper(controllers.getCartController));

cartRouter.post(
  '/',
  validateBody(cartAddSchema),
  ctrlWrapper(controllers.addCartController),
);

cartRouter.put(
  '/update/:cartId/:id',
  isValidId,
  validateBody(cartUpdateSchema),
  ctrlWrapper(controllers.upsertCartController),
);

cartRouter.delete(
  '/:cartId/:id',
  isValidId,
  ctrlWrapper(controllers.deleteItemController),
);

cartRouter.post(
  '/checkout',
  validateBody(placeOrderSchema),
  ctrlWrapper(placeOrderController),
);

export default cartRouter;
