export const notFoundHandler = (req, res) => {
  res.json(404).json({
    status: 404,
    message: `${req.url} not found`,
  });
};
