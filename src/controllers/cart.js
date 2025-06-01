import createError from 'http-errors';

import { addCart, deleteItem, getCart, upsertCart } from '../services/cart.js';

export const getCartController = async (req, res) => {
  const { _id: userId } = req.user;
  const data = await getCart(userId);

  res.json({
    status: 200,
    data,
  });
};

export const addCartController = async (req, res) => {
  const { _id: userId } = req.user;
  const data = await addCart({ ...req.body, userId });

  res.status(201).json({
    status: 201,
    message: 'Product was successfully added',
    data,
  });
};

export const upsertCartController = async (req, res) => {
  const { cartId, id: productId } = req.params;
  const { _id: userId } = req.user;
  await upsertCart({ cartId, productId, userId }, req.body);

  res.status(200).json({
    status: 200,
    message: 'Successfully upserted cart item',
  });
};

export const deleteItemController = async (req, res) => {
  const { cartId, id: _id } = req.params;
  const { _id: userId } = req.user;
  const data = await deleteItem({ cartId, _id, userId });

  if (!data) {
    throw createError(404, `Product with id=${_id} not found`);
  }

  res.status(204).send();
};
