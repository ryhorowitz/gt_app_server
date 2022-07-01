require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const caseFileRouter = require('./routes/caseFileRoutes')

const app = express();

const port = 3000;

app.use(cors({
  origin: '*'
}));
app.use(express.json()); //adds req.body
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

mongoose.connect(
  `mongodb+srv://${process.env.MONGOUSERNAME}:${process.env.MONGOPW}@cluster0.bjw6jfm.mongodb.net?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    // useFindAndModify: false,
    useUnifiedTopology: true
  }
);

app.use(caseFileRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})