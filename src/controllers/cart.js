import { getCart } from '../services/cart.js';

export const getCartController = async (req, res) => {
  const { _id: userId } = req.user;
  const data = await getCart(userId);

  res.json({
    status: 200,
    data,
  });
};

// export const upsertCartController = async (req, res) => {
//   const { id } = req.params;
//   const data = await updateCart(id, req.body);
// };
