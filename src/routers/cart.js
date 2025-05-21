import { Router } from 'express';

import {
  getCartController,
  //   upsertCartController,
} from '../controllers/cart.js';
import { placeOrderController } from '../controllers/orders.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const cartRouter = Router();

cartRouter.get('/', ctrlWrapper(getCartController));

// cartRouter.put('/update/:id', ctrlWrapper(upsertCartController));

cartRouter.post('/checkout', ctrlWrapper(placeOrderController));

export default cartRouter;
