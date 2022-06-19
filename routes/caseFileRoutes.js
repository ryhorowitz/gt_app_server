const express = require("express");
const CaseFileModel = require("../models/caseFiles");
const app = express();

app.get("/case-files", async (request, response) => {
  const caseFiles = await CaseFileModel.find({});

  try {
    response.send(caseFiles);
  } catch (error) {
    response.status(500).send(error);
  }
});

module.exports = app;