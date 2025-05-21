import { Router } from 'express';

import { getReviewsController } from '../controllers/reviews.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const reviewsRouter = Router();

reviewsRouter.get('/', ctrlWrapper(getReviewsController));

export default reviewsRouter;
