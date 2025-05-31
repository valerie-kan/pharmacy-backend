import { getReviews } from '../services/reviews.js';

export const getReviewsController = async (req, res) => {
  const data = await getReviews();

  res.json({
    status: 200,
    message: 'Successfully found reviews',
    data,
  });
};
