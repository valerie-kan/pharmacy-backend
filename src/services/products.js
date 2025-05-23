import ProductCollection from '../db/models/Product.js';

import { calcPaginationData } from '../utils/calcPaginationData.js';

export const getProducts = async ({ page, perPage, filter = {} }) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const productQuery = ProductCollection.find();
  if (filter.category) {
    productQuery.where('category').equals(filter.category);
  }
  if (filter.name) {
    productQuery.where('name', filter.name);
  }

  const items = await productQuery.skip(skip).limit(limit);
  const total = await ProductCollection.find()
    .merge(productQuery)
    .countDocuments();

  const paginationData = calcPaginationData({ total, page, perPage });

  return {
    items,
    total,
    ...paginationData,
  };
};

export const getProductById = (id) => ProductCollection.findById(id);
