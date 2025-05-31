export const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err); // не пробуємо відправити повторно
  }

  const { status = 500, message } = err;
  res.status(status).json({
    status,
    message,
  });
};
