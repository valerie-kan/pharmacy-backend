import Joi from 'joi';

export const cartAddSchema = Joi.object({
  productId: Joi.string().required(),
  quantity: Joi.number().integer().min(1).required().messages({
    'number.min': "Quantity can't be less then 1",
  }),
});

export const cartUpdateSchema = Joi.object({
  quantity: Joi.number().integer().min(1).required().messages({
    'number.min': "Quantity can't be less then 1",
  }),
});
