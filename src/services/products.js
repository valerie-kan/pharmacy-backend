import ProductCollection from '../db/models/Product.js';

export const getProducts = () => ProductCollection.find();
