const { create } = require('domain');
const express = require('express');
const app = express();
const fs = require('fs');
const morgan = require('morgan');

// 1. Read data
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
)

// 2.setting up a server to listen on port 3000
const port = 3000

app.listen(port, () => {
  console.log(`App running on port ${port}...`)
})

//1. Middelwares
app.use(morgan('dev'));

app.use(express.json());
app.use((req, res, next) => {
  console.log('hello from middleware👋🏼')
  req.requestTime = new Date().toISOString();
  next();
});

// 3. GET, POST, PATCH AND DELETE



// Call the functions with route


///////////////////// 
//USERS
///////////////////// 

const getAllUsers = (req, res) => {
  res.status(500).json({
    message: 'This route is not design yet',
    results: tours.length,
    data: {
      tours,
    },
  })
}

const getUser = (req, res) => {
  const id = req.params.id * 1
  const tour = tours.find((el) => el.id === id)
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    })
  } else {
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    })
  }
}

const deleteUser = (req, res) => {
  const id = req.params.id * 1
  const tour = tours.find((el) => el.id === id)
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    })
  } else {
    res.status(204).json({
      status: 'success',
      data: {
        tour: 'null',
      },
    })
  }
}
const createUser = (req, res) => {
  const newId = tours[tours.length - 1].id + 1
  const newTour = Object.assign(
    {
      id: newId,
    },
    req.body
  )
  tours.push(newTour)

  // To post, we need to write the file, but always as ASYNC because we are inside a callback function!!

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      if (err) {
        res.status(500).json({
          status: 'error',
          message: 'Error writing data to file',
        })
      } else {
        res.status(201).json({
          status: 'success',
          data: {
            tour: newTour,
          },
        })
        console.log(res)
      }
    }
  )
}

const patchUser = (req, res) => {
  const id = req.params.id * 1
  const tour = tours.find((el) => el.id === id)
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    })
  } else {
    res.status(200).json({
      status: 'success',
      data: {
        tour: '<Updated tour here....>',
      },
    })
  }
}
/////////////////////
/// ROUTES
/////////////////////



app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

