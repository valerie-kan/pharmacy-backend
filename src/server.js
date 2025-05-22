import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { getEnvVar } from './utils/getEnvVar.js';

// import { logger } from './middlewares/logger.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';

import authRouter from './routers/auth.js';
import productsRouter from './routers/products.js';
import reviewsRouter from './routers/reviews.js';
import storesRouter from './routers/stores.js';
import cartRouter from './routers/cart.js';

export const startServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(cookieParser());
  // app.use(logger);

  app.use('/user', authRouter);
  app.use('/products', productsRouter);
  app.use('/customer-reviews', reviewsRouter);
  app.use('/stores', storesRouter);
  app.use('/cart', cartRouter);

  app.use(notFoundHandler);

  app.use(errorHandler);

  const port = Number(getEnvVar('PORT', 3000));

  app.listen(port, () => console.log(`Server running on ${port} port`));
};
