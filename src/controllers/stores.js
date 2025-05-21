import { getAllStores } from '../services/stores.js';

export const getStoresController = async (req, res) => {
  const data = await getAllStores();

  res.json({
    status: 200,
    message: 'Successfuly found pharmacies',
    data,
  });
};
