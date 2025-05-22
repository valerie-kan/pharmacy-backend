import createError from 'http-errors';
import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';

import {
  accessTokenLifeTime,
  refreshTokenLifeTime,
} from '../constants/user.js';

import UserCollection from '../db/models/User.js';
import SessionCollection from '../db/models/Session.js';

const createSessionData = () => ({
  accessToken: randomBytes(30).toString('base64'),
  refreshToken: randomBytes(30).toString('base64'),
  accessTokenValidUntil: Date.now() + accessTokenLifeTime,
  refreshTokenValidUntil: Date.now() + refreshTokenLifeTime,
});

const createUserData = (user) => ({
  username: user.username,
  phone: user.phone,
  email: user.email,
});

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

  const sessionData = createSessionData();
  await SessionCollection.create({
    userId: newUser._id,
    ...sessionData,
  });

  return {
    user: createUserData(newUser),
    accessToken: sessionData.accessToken,
  };
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

  const sessionData = createSessionData();

  const session = await SessionCollection.create({
    userId: user._id,
    ...sessionData,
  });

  return {
    user: createUserData(user),
    accessToken: sessionData.accessToken,
    refreshToken: sessionData.refreshToken,
    id: session._id, // Додаємо ID сесії
    refreshTokenValidUntil: session.refreshTokenValidUntil,
  };
};

export const refresh = async ({ refreshToken, sessionId }) => {
  const oldSession = SessionCollection.findOne({
    _id: sessionId,
    refreshToken,
  });
  if (!oldSession) {
    throw createError(401, 'Session not found');
  }

  if (Date.now() > oldSession.refreshTokenValidUntil) {
    throw createError(401, 'Refresh token expired');
  }

  await SessionCollection.deleteOne({ _id: sessionId });

  const sessionData = createSessionData();

  return SessionCollection.create({
    userId: oldSession.userId,
    ...sessionData,
  });
};

export const logout = async (sessionId) => {
  await SessionCollection.deleteOne({ _id: sessionId });
};

export const getSession = (filter) => SessionCollection.findOne(filter);

export const getUser = (filter) => UserCollection.findOne(filter);
