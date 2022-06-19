require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const caseFileRouter = require('./routes/caseFileRoutes')

const app = express();

const port = 3000;

// app.use(cors());
app.use(express.json()); //adds req.body

// // get all cases
app.get('/', (req, res) => {
  res.send('Hello World!')
})

mongoose.connect(
  `mongodb+srv://${process.env.MONGOUSERNAME}:${process.env.MONGOPW}@gt-app.jur6dhu.mongodb.net?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    // useFindAndModify: false,
    useUnifiedTopology: true
  }
);

// app.use(Router);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})