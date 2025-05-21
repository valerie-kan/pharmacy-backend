export const notFoundHandler = (req, res) => {
  res.json(404).json({
    message: `${req.url} not found`,
  });
};
