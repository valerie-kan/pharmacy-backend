import Joi from 'joi';

export const getProductByIdSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});
