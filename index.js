const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = 3000;

// app.use(cors());
app.use(express.json()); //adds req.body

// // get all cases
app.get('/', (req, res) => {
  res.send('Hello World!')
})
// // create a case file
// app.post()
// // update a case file
// // update a case file status
// // delete a case file
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})