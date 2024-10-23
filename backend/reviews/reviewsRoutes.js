import express from 'express';
import { getReviews } from 'reviewsController.js';

const reviewRoutes = express.Router();

// Get all reviews
reviewRoutes.get('/all', getReviews);

export default reviewRoutes;
