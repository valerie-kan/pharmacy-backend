import CartCollection from '../db/models/Cart.js';

export const getCart = (userId) => CartCollection.findOne({ userId });

// export const updateCart = async (_id, payload) => {
//   const result = await CartCollection.findOneAndUpdate({ _id }, payload);

//   return result;
// };
