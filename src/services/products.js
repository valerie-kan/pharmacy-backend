import ProductCollection from '../db/models/Product.js';

import { calcPaginationData } from '../utils/calcPaginationData.js';

export const getProducts = async ({ page, perPage }) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;
  const items = await ProductCollection.find().skip(skip).limit(limit);
  const total = await ProductCollection.countDocuments();

  const paginationData = calcPaginationData({ total, page, perPage });

  return {
    items,
    total,
    ...paginationData,
  };
};

export const getProductById = (id) => ProductCollection.findById(id);
