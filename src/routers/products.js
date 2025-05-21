import { Router } from 'express';

import * as productsController from '../controllers/products.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const productsRouter = Router();

productsRouter.get('/', ctrlWrapper(productsController.getProductsController));

productsRouter.get(
  '/:id',
  ctrlWrapper(productsController.getProductByIdController),
);

export default productsRouter;
