import { ObjectId } from 'mongodb';

import CartCollection from '../db/models/Cart.js';

export const getCart = (userId) => CartCollection.findOne({ userId });

export const addCart = (payload) => CartCollection.create(payload);

export const upsertCart = async ({ cartId, _id, userId }, payload) => {
  const cart = await CartCollection.findOne({ _id: cartId, userId });

  if (!cart) return null;

  const existingItemIndex = cart.items.findIndex(
    (item) => item.productId.toString() === _id,
  );

  let isNew = false;

  if (existingItemIndex >= 0) {
    cart.items[existingItemIndex].quantity += payload.quantity;
  } else {
    cart.items.push({
      productId: new ObjectId(String(_id)),
      quantity: payload.quantity,
    });
    isNew = true;
  }

  const updatedCart = await cart.save();

  return {
    isNew,
    data: updatedCart,
  };
};

export const deleteItem = (filter) =>
  CartCollection.findOneAndUpdate(
    { _id: filter.cartId, userId: filter.userId },
    { $pull: { items: { _id: filter._id } } },
  );
