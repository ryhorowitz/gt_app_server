const express = require("express");
const CaseFileModel = require("../models/caseFiles");
const app = express();

// GET single case by caseNumber
app.get ("/case-file/:id", async (req, res) => {
  console.log('req case number is:', req.params.id)
  const caseNumber = req.params.id;
  const doc = await CaseFileModel.find({ caseNumber });
  console.log('caseFile:', doc);
  try {
    res.send(doc).status(200);
  } catch (err) {res.status(500).send(err)};

})

// GET cases by Last Name
app.get ("/lastName/", async (req, res) => {
  const lastName = req.query.lastName;
  console.log('lastname is:', lastName)
  const docs = await CaseFileModel.find({ lastName: { $regex: lastName } });
  // console.log('docs:', docs);
  try {
    res.send(docs);
  } catch (err) {res.status(500).send(err)};  
})

//GET all caseFiles NOT HOOKED UP
app.get("/case-files/all", async (req, res) => {
  const docs = await CaseFileModel.find({});

  try {
    res.send(docs);
  } catch (err) {
    res.status(500).send(err);
  }
});

//ADD new case file 
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
// UPDATE status of casefile
app.put("/case-files/update/:id", async (req, res) => {
  const caseNumber = req.params.id;
  const update = req.body;
  try {
    const result = await CaseFileModel.findOneAndUpdate(caseNumber, update, {
      new: true
    });
    console.log('result', result)
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});
// DELETE case file 
app.delete("/case-files", async (req, res) => {
  try {
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