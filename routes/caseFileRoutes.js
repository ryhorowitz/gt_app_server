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
  const caseFile = await new CaseFileModel(req.body);

  try {
    await caseFile.save();
    res.send(caseFile)
  } catch (err) {
    res.status(500).send(err);
  }
})
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
    const caseFile = await CaseFileModel.findOneAndDelete(req.params.id);
    
    if (!caseFile) { response.status(404).send("No item found") };
    response.status(200).send();
  } catch (error) {
    response.status(500).send(error);
  }
});

module.exports = app;