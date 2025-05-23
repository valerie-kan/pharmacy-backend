import createError from 'http-errors';

import { getProducts } from '../services/products.js';
import { getProductById } from '../services/products.js';

import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseProductFilterParams } from '../utils/filters/parseProductFilterParams.js';

export const getProductsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const filter = await parseProductFilterParams(req.query);
  const data = await getProducts({ page, perPage, filter });

  res.json({
    status: 200,
    message: 'Successfuly found products',
    data,
  });
};

export const getProductByIdController = async (req, res) => {
  const { id } = req.params;

  const data = await getProductById(id);

  if (!data) {
    throw createError(404, `Product ${id} not found`);
  }

  res.json({
    status: 200,
    message: `Product ${id} successfully found`,
    data,
  });
};
