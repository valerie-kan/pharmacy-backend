import { Schema, model } from 'mongoose';

import { emailRegexp } from '../../constants/user.js';
import { phoneRegexp } from '../../constants/user.js';

import { handleSaveError } from './hooks.js';

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      match: phoneRegexp,
      required: true,
    },
    email: {
      type: String,
      match: emailRegexp,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

userSchema.post('save', handleSaveError);

const UserCollection = model('user', userSchema);

export default UserCollection;
