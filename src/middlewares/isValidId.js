import { isValidObjectId } from 'mongoose';
import createError from 'http-errors';

// export const isValidId = (req, res, next) => {
//   const { id } = req.params;
//   if (!isValidObjectId(id)) {
//     return next(createError(404, `${id} not valid id`));
//   }
//   next();
// };

export const isValidId = (req, res, next) => {
  const { cartId, id, productId } = req.params;

  const invalidParam =
    cartId && !isValidObjectId(cartId)
      ? 'cartId'
      : id && !isValidObjectId(id)
      ? 'id'
      : productId && !isValidObjectId(productId)
      ? 'productId'
      : null;

  if (invalidParam) {
    return next(
      createError(404, `${req.params[invalidParam]} is not a valid ObjectId`),
    );
  }

  next();
};
