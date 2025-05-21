import CartCollection from '../db/models/Cart.js';

export const getCart = (/*userId*/) => CartCollection.find(/*{ userId }*/);

// export const updateCart = async (_id, payload) => {
//   const result = await CartCollection.findOneAndUpdate({ _id }, payload);

//   return result;
// };
