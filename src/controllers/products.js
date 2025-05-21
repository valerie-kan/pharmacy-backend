import createError from 'http-errors';

import { getProducts } from '../services/products.js';
import { getProductById } from '../services/products.js';

import { getProductByIdSchema } from '../validation/products.js';

export const getProductsController = async (req, res) => {
  const data = await getProducts();

  res.json({
    status: 200,
    message: 'Successfuly found products',
    data,
  });
};

export const getProductByIdController = async (req, res) => {
  try {
    await getProductByIdSchema.validateAsync(req.params);
  } catch (error) {
    throw createError(400, error.message);
  }

  const { id } = req.params;

  const data = await getProductById(id);

  if (!data) {
    throw createError(404, `Product ${id} not found`);
    // const error = new Error(`Product ${id} not found`);
    // error.status = 404;
    // throw error;
  }

  res.json({
    status: 200,
    message: 'Successfully found products',
    data,
  });
};
