const express = require('express');
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

app.get('/api/v1/tours', (req, res)=> {
  res.status(200).json({
    status: 'success',
    data: {
      tours: tours
    }
  })
});

const port = 3000;
const app = express();
app.listen(port, () => {
  console.log(`App running on port ${port}...`)
})

