import ProductCollection from '../../db/models/Product.js';

export const parseProductFilterParams = async ({ category, name }) => {
  const categoriesList = await ProductCollection.distinct('category');
  const filter = {};

  if (category && categoriesList.includes(category)) {
    filter.category = category;
  }

  if (name) {
    filter.name = { $regex: name, $options: 'i' };
  }

  return filter;
};
