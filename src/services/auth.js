import createError from 'http-errors';
import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';

import {
  accessTokenLifeTime,
  refreshTokenLifeTime,
} from '../constants/user.js';

import UserCollection from '../db/models/User.js';
import SessionCollection from '../db/models/Session.js';

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

export const login = async (payload) => {
  const { email, password } = payload;

  const user = await UserCollection.findOne({ email });
  if (!user) {
    throw createError(401, 'Email or password is invalid');
  }

  const passwordEqual = await bcrypt.compare(password, user.password);
  if (!passwordEqual) {
    throw createError(401, 'Email or password is invalid');
  }

  await SessionCollection.deleteOne({ userId: user._id });

  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return SessionCollection.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: Date.now() + accessTokenLifeTime,
    refreshTokenValidUntil: Date.now() + refreshTokenLifeTime,
  });
};
