import Joi from 'joi';

export const placeOrderSchema = Joi.object({
  photo: Joi.string(),
  name: Joi.string().required(),
  address: Joi.string().required(),
  products: Joi.string().required(),
  price: Joi.string().required(),
  status: Joi.string().required(),
});
