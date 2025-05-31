import CartCollection from '../db/models/Cart.js';

export const getCart = (userId) => CartCollection.findOne({ userId });

export const addCart = (payload) => CartCollection.create(payload);

export const updateCart = (filter, payload) =>
  CartCollection.findOneAndUpdate(
    { _id: filter.cartId, 'items._id': filter._id, userId: filter.userId },
    { $set: { 'items.$.quantity': payload.quantity } },
  );

export const deleteItem = (filter) =>
  CartCollection.findOneAndUpdate(
    { _id: filter.cartId, userId: filter.userId },
    { $pull: { items: { _id: filter._id } } },
  );
