const mongoose = require('mongoose');
const { Schema } = mongoose;

const CaseFileSchema = new Schema({
  caseNumber: {
    type: String,
    unique: true,
    maxLength: 7,
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
    enum: [ 'active', 'inactive', 'closed'],
    default: 'active'
  }
})

const CaseFile = mongoose.model('CaseFile', CaseFileSchema);

module.exports = CaseFile;