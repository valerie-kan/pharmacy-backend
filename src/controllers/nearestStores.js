import { getNearestStores } from '../services/nearestStores.js';

export const getNearestStoresController = async (req, res) => {
  const data = await getNearestStores();

  res.json({
    status: 200,
    message: 'Successfuly found pharmacies',
    data,
  });
};
