import { ObjectId } from 'mongodb';
import createHttpError from 'http-errors';

import CartCollection from '../db/models/Cart.js';

export const getCart = (userId) => CartCollection.findOne({ userId });

export const addCart = (payload) => CartCollection.create(payload);

export const upsertCart = async ({ cartId, productId, userId }, payload) => {
  const cart = await CartCollection.findOne({ _id: cartId, userId });

  if (!cart) {
    throw createHttpError(404, 'Cart not found');
  }

  const existingItemIndex = cart.items.findIndex(
    (item) => item.productId.toString() === productId,
  );

  if (existingItemIndex >= 0) {
    cart.items[existingItemIndex].quantity += payload.quantity;
  } else {
    cart.items.push({
      productId: new ObjectId(String(productId)),
      quantity: payload.quantity,
    });
  }

  const updatedCart = await cart.save();

  return {
    data: updatedCart,
  };
};

export const deleteItem = (filter) =>
  CartCollection.findOneAndUpdate(
    { _id: filter.cartId, userId: filter.userId },
    { $pull: { items: { _id: filter._id } } },
  );
