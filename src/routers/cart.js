import { Router } from 'express';

import * as controllers from '../controllers/cart.js';
import { placeOrderController } from '../controllers/orders.js';

import { authenticate } from '../middlewares/authenticate.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const cartRouter = Router();

cartRouter.use(authenticate);

cartRouter.get('/', ctrlWrapper(controllers.getCartController));

cartRouter.post('/', ctrlWrapper(controllers.addCartController));

cartRouter.put(
  '/update/:cartId/:itemId',
  ctrlWrapper(controllers.updateCartController),
);

cartRouter.delete(
  '/:cartId/:itemId',
  ctrlWrapper(controllers.deleteItemController),
);

cartRouter.post('/checkout', ctrlWrapper(placeOrderController));

export default cartRouter;
