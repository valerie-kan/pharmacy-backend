import StoreCollection from '../db/models/Store.js';

export const getAllStores = () => StoreCollection.find();
