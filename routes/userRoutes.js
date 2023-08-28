const express = require('express');
const userController = require('../controllers/userController');
// const reviewController = require('./../controllers/reviewController');
// const tourController = require('./../controllers/tourController');
// const router = express.Router();

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

// router
//   .route('/:tourId/reviews').post(authController.protect, authController.restrictTo('users'))
module.exports = router;
