import CartCollection from '../db/models/Cart.js';

export const getCart = (userId) => CartCollection.findOne({ userId });

export const addCart = (payload) => CartCollection.create(payload);

export const updateCart = (cartId, id, payload) =>
  CartCollection.findOneAndUpdate(
    { _id: cartId, 'items._id': id },
    { $set: { 'items.$.quantity': payload.quantity } },
  );

export const deleteItem = (cartId, id) =>
  CartCollection.findOneAndUpdate(
    { _id: cartId },
    { $pull: { items: { _id: id } } },
  );
