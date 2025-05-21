import NearestStoreCollection from '../db/models/NearestStore.js';

export const getNearestStores = () => NearestStoreCollection.find();
