import { Schema, model } from 'mongoose';

import { EMAIL_REGEX } from '../../constants/user.js';
import { PHONE_REGEX } from '../../constants/user.js';

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    match: PHONE_REGEX,
    required: true,
  },
  email: {
    type: String,
    match: EMAIL_REGEX,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const UserCollection = model('user', userSchema);

export default UserCollection;
