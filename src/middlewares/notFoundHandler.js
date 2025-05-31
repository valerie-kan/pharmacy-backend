export const notFoundHandler = (req, res, next) => {
  if (res.headersSent) {
    return next(); // нічого не робимо, якщо вже щось відправлено
  }

  res.json(404).json({
    message: `${req.url} not found`,
  });
};
