import ReviewCollection from '../db/models/Review.js';

export const getReviews = () => ReviewCollection.find();
