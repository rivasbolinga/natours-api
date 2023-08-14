const Tour = require('../models/tourModel');

// exports.getAllTours = (req, res) => {

// }

// exports.getTour = (req, res) => {

// }

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      message: error,
    });
  }
};

// exports.updateTour = (req, res) => {

// }

// exports.deleteTour = (req, res) => {

// }
