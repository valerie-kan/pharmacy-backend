import * as authServices from '../services/auth.js';

// const setupSession = (res, session) => {
//   res.cookie('refreshToken', session.refreshToken, {
//     httpOnly: true,
//     expires: session.refreshTokenValidUntil,
//   });

//   res.cookie('sessionId', session.id, {
//     httpOnly: true,
//     expires: session.refreshTokenValidUntil,
//   });
// };

const setupSession = (req, res, session) => {
  const isSecure = req.secure || req.headers['x-forwarded-proto'] === 'https';

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
    sameSite: isSecure ? 'None' : 'Lax', // HTTPS: None, HTTP: Lax
    secure: isSecure, // HTTPS: true, HTTP: false
  });

  res.cookie('sessionId', session.id, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
    sameSite: isSecure ? 'None' : 'Lax',
    secure: isSecure,
  });
};

export const registerController = async (req, res) => {
  await authServices.register(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered',
  });
};

export const loginController = async (req, res) => {
  const session = await authServices.login(req.body);

  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully logged in a user',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const refreshController = async (req, res) => {
  const { refreshToken, sessionId } = req.cookies;
  const session = await authServices.refresh({ refreshToken, sessionId });

  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Session successfully refreshed',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const getUserInfoController = (req, res) => {
  const { username, email } = req.user;

  res.json({
    status: 200,
    data: { username, email },
  });
};

export const logoutController = async (req, res) => {
  if (req.cookies.sessionId) {
    await authServices.logout(req.cookies.sessionId);
  }

  res.clearCookie('refreshToken');
  res.clearCookie('sessionId');

  res.status(204).send();
};
