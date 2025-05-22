import Joi from 'joi';

import { emailRegexp } from '../constants/user.js';
import { phoneRegexp } from '../constants/user.js';

export const authRegisterSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  phone: Joi.string().pattern(phoneRegexp).required(),
  password: Joi.string().min(6).required(),
});
