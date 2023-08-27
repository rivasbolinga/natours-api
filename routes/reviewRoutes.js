const express = require('express');
const reviewController = require('../controllers/reviewController');

const router = express.Router();

router.route('/create-review').post(reviewController.createReview);
router.route('/').get(reviewController.getAllreviews);
router.route('/:id').get(reviewController.getReview);
module.exports = router;
