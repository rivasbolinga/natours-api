const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });
const DB = process.env.DATABASE;
// Mangoose options
mongoose
.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
})
.then(con => {
  console.log('DB CONNEXION SUSCESFULL');
});
// Create schema of tours
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
});

// Create a model (always in Upeercase)

const Tour = mongoose.model('Tour', tourSchema);

// We create the tour
const testTour = new Tour({
  name: 'TLOLOLO',
  rating: 4.7,
  price: 497,
});

// We save our new tour.
testTour
.save()
.then(doc => {
  console.log(doc)
})
.catch(err => {
  console.log('ERROR 🚨', err)
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

