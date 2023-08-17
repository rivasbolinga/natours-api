const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('../../models/tourModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE;
// Mangoose options
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((con) => {
    console.log('DB CONNEXION SUSCESFULL');
  });

//////////////////////////////////////
// READ JSON FILE

// 1. We read the file
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'),
);

// 2. Import data into the database => create
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('data succesfully loaded');
  } catch (err) {
    console.log(err);
  }
};

// 3. Delete ALL data from collection => deleteMany
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('data successfully loaded');
  } catch (err) {
    console.log(err);
  }
};

// 4. Configuration to use our functions in the command line.
if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}

console.log(process.argv);
