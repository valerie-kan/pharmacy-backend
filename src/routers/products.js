import { Router } from 'express';

import {
  getProductsController,
  getProductByIdController,
} from '../controllers/products.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const productsRouter = Router();

productsRouter.get('/', ctrlWrapper(getProductsController));

productsRouter.get('/:id', ctrlWrapper(getProductByIdController));

export default productsRouter;
