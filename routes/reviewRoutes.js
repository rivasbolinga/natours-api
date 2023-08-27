const express = require('express');
const reviewController = require('../controllers/reviewController');

const router = express.Router();

router.route('/create-review').get(reviewController.createReview);

module.exports = router;
