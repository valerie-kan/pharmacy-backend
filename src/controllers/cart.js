import createError from 'http-errors';

import { addCart, deleteItem, getCart, updateCart } from '../services/cart.js';

export const getCartController = async (req, res) => {
  const { _id: userId } = req.user;
  const data = await getCart(userId);

  res.json({
    status: 200,
    data,
  });
};

export const addCartController = async (req, res) => {
  const data = await addCart(req.body);

  res.status(201).json({
    status: 201,
    message: 'Product was successfully added',
    data,
  });
};

export const updateCartController = async (req, res) => {
  const { cartId, itemId } = req.params;
  const data = await updateCart(cartId, itemId, req.body);

  if (!data) {
    throw createError(404, `Product with id=${itemId} not found`);
  }

  res.json({
    status: 200,
    data,
  });
};

export const deleteItemController = async (req, res) => {
  const { cartId, itemId } = req.params;
  const data = await deleteItem(cartId, itemId);

  if (!data) {
    throw createError(404, `Product with id=${itemId} not found`);
  }

  res.status(204).send();
};
