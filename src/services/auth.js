import createError from 'http-errors';
import bcrypt from 'bcrypt';

import UserCollection from '../db/models/User.js';

export const register = async (payload) => {
  const { email, password } = payload;
  const user = await UserCollection.findOne({ email });
  if (user) {
    throw createError(409, 'User already exists');
  }

  const hashPwd = await bcrypt.hash(password, 10);

  const newUser = await UserCollection.create({
    ...payload,
    password: hashPwd,
  });

  return newUser;
};
