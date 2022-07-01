const express = require("express");
const CaseFileModel = require("../models/caseFiles");
const app = express();

//get all caseFiles
app.get("/case-files", async (request, response) => {
  const caseFiles = await CaseFileModel.find({});

  try {
    response.send(caseFiles);
  } catch (err) {
    response.status(500).send(err);
  }
});
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
// app.patch("/case-files", async (req, res) => {
//   try {
//     await CaseFileModel.findOneAndUpdate(req.caseNumber, request.body);
//     await CaseFileModel.save();
//     response.send(caseFile);
//   } catch (error) {
//     response.status(500).send(error);
//   }
// });

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