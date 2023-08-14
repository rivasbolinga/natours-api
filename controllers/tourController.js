const fs = require('fs');
const Tour = require('./../models/tourModel.js');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);



exports.getAllTours = (req, res) => {

}

exports.getTour = (req, res) => {

}

exports.createTour = (req, res) => {
}

exports.updateTour = (req, res) => {
  
}

exports.deleteTour = (req, res) => {

}
