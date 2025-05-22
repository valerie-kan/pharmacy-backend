import * as authServices from '../services/auth.js';

export const registerController = async (req, res) => {
  const data = await authServices.register(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered',
    data,
  });
};

export const loginController = async (req, res) => {
  const session = await authServices.login(req.body);

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

  res.cookie('sessionId', session.id, {
    httpOnly: true,
  });

  res.json({
    status: 200,
    message: 'Successfully logged in a user',
    data: {
      accessToken: session.accessToken,
    },
  });
};
