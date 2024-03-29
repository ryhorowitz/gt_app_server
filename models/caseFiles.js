const mongoose = require('mongoose');
const { Schema } = mongoose;

const CaseFileSchema = new Schema({
  caseNumber: {
    type: String,
    unique: true,
    maxLength: 8,
    required: true
  },
  lastName: {
    type: String, 
    uppercase: true,
    trim: true,
    required: true 

  },
  firstName: {
    type: String, 
    uppercase: true,
    trim: true,
    required: true 
  },
  status: {
    type: String,
    enum: [ 'open', 'closed' ],
    default: 'open'
  },
  year: {
    type: Number,
    min: 2012,
    max: 2032
  }
})

const CaseFile = mongoose.model('CaseFile', CaseFileSchema);

module.exports = CaseFile;