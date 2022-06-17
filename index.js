const express = require('express')
const app = express()
const port = 3000;
const cors = require("cors");
const pool = require(".dbConnect");
const search = require('./routes/search');

app.use(cors());
app.use(express.json());
app.use('/search', search);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})