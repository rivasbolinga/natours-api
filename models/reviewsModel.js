const mongoose = require('mongoose');
const slugify = require('slugify');
// const validator = require('validator');

const reviewSchema = new mongoose.Schema({
  reviews: {
    type: String,
    maxlength: [400, 'A review should have less or equal than 400 characters'],
    minlength: [10, 'A review must have more or equal than 10 characters'],
  },
  ratings: {
    type: Number, 
    required: [true, 'A review should have a rating']
  }

});
