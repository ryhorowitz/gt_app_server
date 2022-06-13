const express = require('express')
const app = express()
const port = 1234
const search = require('./routes/search');

app.use('/search', search);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})