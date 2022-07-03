const express = require("express");
const CaseFileModel = require("../models/caseFiles");
const app = express();

//get all caseFiles
app.get("/case-files", async (req, res) => {
  const caseFiles = await CaseFileModel.find({});

  try {
    res.send(caseFiles);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get ("/case-file/:id", async (req, res) => {
  console.log('req case number is:', req.params.id)
  const caseNumber = req.params.id;
  // find where caseNumber === req.params's data
  const caseFile = await CaseFileModel.find({ caseNumber });
  console.log('caseFile:', caseFile);
  try {
    res.send(caseFile);
  } catch (err) {res.status(500).send(err)};

})
//add new case file 
app.post("/case-files", async (req, res) => {
  console.log('post is', req.body);
  const caseFile = await new CaseFileModel(req.body);

  try {
    await caseFile.save();
    res.status(200).send(caseFile)
  } catch (err) {
    res.status(500).send(err);
  }
})

//SEARCH for a file by caseNumber/ or last name or firstname or status
//update need to work on further but do delete first
app.put("/case-files/update/:id", async (req, res) => {
  console.log('id:', req.params.id);
  console.log('req.body is', req.body);
  const caseNumber = req.params.id;
  const update = req.body;
  try {
    await CaseFileModel.findOneAndUpdate(caseNumber, update, {
      new: true
    });
    res.send(caseFile);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.delete("/case-files", async (req, res) => {
  try {
    // console.log('body is', req.body)
    let data = req.body.data 
    console.log('data is', data)
    const caseFile = await CaseFileModel.findOneAndDelete({caseNumber: data});

    if (!caseFile) { res.status(404).send("No item found") };
    console.log('case deleted: ',caseFile)
    res.status(200).send(caseFile);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = app;