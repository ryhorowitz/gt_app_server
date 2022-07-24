const express = require("express");
const CaseFileModel = require("../models/caseFiles");
const app = express();

// GET single case by caseNumber
app.get ("/case-file/:id", async (req, res) => {
  console.log('req case number is:', req.params.id)
  const caseNumber = req.params.id;
  const doc = await CaseFileModel.find({ caseNumber: { $regex: caseNumber, $options: 'i'  }});
  console.log('caseFile:', doc);
  try {
    res.send(doc).status(200);
  } catch (err) {res.status(500).send(err)};

})

// GET cases by Last Name
app.get ("/name-search/", async (req, res) => {
  const firstName = req.query.firstname;
  const lastName = req.query.lastname;
  console.log('firstname is:', firstName)
  console.log('lastname is:', lastName)
  //need to work on not worrying about letter casing. right now only works if cases match exactly.
  const docs = await CaseFileModel.find({ 
    firstName: { $regex: firstName, $options: 'i' },
    lastName: { $regex: lastName, $options: 'i' }       
  })
  console.log('docs:', docs);
  try {
    res.send(docs);
  } catch (err) {res.status(500).send(err)};  
  // res.status(200);
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
  // console.log('casenumber is', caseNumber)
  // console.log('update status is', update)
  try {
    const result = await CaseFileModel.findOneAndUpdate({ caseNumber }, update, {
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