const express = require('express');
const app = express();
const fs = require('fs');

// 1. Read data
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

// 2. when a client makes a GET request to this endpoint on your server, the provided callback function will be executed.
app.get('/api/v1/tours', (req, res)=> {
  res.status(200).json({
  message: 'Hello from the server', 
  results: tours.length, 
  data: {
   tours
  }});
});

// 3.setting up a server to listen on port 3000
const port = 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}...`)
})

// 4. Post into the API

app.post('/api/v1/tour', (req, res) => {
  const newId = tours[tours.length - 1].id + 1
  const newTour = Object.assign(
    {
      id: newId,
    },
    req.body
  )
  tours.push(newTour)

  // 5. To post, we need to write the file, but always as ASYNC because we are inside a callback function!!
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
})

// 6. Get data with a variable ID (in our case the tour id whe request)
app.get('/api/v1/tours/:id', (req, res) => {
  const id = req.params.id * 1
  const tour = tours.find((el) => el.id === id)
  if(!tour) {
     return res.status(404).json({
       status: 'fail',
       message: 'Invalid ID'
     })

  } else {
     res.status(200).json({
       status: 'success',
       data: {
         tour
       },
     })
  }
})

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// UPDATE DATA WITH PATCH
app.patch('/api/v1/tours/:id', (req, res) => {
    const id = req.params.id * 1
    const tour = tours.find((el) => el.id === id)
  if(!tour) {
     return res.status(404).json({
       status: 'fail',
       message: 'Invalid ID'
     })

  } else {
  res.status(200).json({
    status:'success',
    data: {
      tour: '<Updated tour here....>'
    }
  })
}
})