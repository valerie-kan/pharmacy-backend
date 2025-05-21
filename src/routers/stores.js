import { Router } from 'express';

import { getNearestStoresController } from '../controllers/nearestStores.js';
import { getStoresController } from '../controllers/stores.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const storesRouter = Router();

storesRouter.get('/', ctrlWrapper(getStoresController));

storesRouter.get('/nearest', ctrlWrapper(getNearestStoresController));

export default storesRouter;
