import express from 'express';
import cors from 'cors';
import pino from 'pino-http';

import { getEnvVar } from './utils/getEnvVar.js';

import { getProducts } from './services/products.js';

export const startServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use('/products', async (req, res) => {
    const data = await getProducts();

    res.json({
      status: 200,
      message: 'Successfully found products',
      data,
    });
  });

  app.use((req, res) => {
    res.json(404).json({
      message: `${req.url} not found`,
    });
  });

  app.use((err, req, res, next) => {
    res.status(500).json({
      message: 'Server error',
      error: err.message,
    });
  });

  app.listen(Number(getEnvVar('PORT', 3000)));
};
