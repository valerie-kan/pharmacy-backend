import Joi from 'joi';

const addItemSchema = Joi.object({
  productId: Joi.string().required(),
  quantity: Joi.number().integer().min(1).required().messages({
    'number.min': "Quantity can't be less then 1",
  }),
});

export const cartAddSchema = Joi.object({
  items: Joi.array().items(addItemSchema).required(),
});

export const cartUpdateSchema = Joi.object({
  quantity: Joi.number().integer().min(1).required().messages({
    'number.min': "Quantity can't be less then 1",
  }),
});
