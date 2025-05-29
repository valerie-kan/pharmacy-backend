import CartCollection from '../db/models/Cart.js';

export const getCart = (userId) => CartCollection.findOne({ userId });

export const addCart = (payload) => CartCollection.create(payload);

export const updateCart = (cartId, itemId, payload) =>
  CartCollection.findOneAndUpdate(
    { _id: cartId, 'items._id': itemId },
    { $set: { 'items.$.quantity': payload.quantity } },
  );

export const deleteItem = (cartId, itemId) =>
  CartCollection.findOneAndUpdate(
    { _id: cartId },
    { $pull: { items: { _id: itemId } } },
  );
