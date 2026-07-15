const mongoose = require("mongoose");

const employeesSchema = mongoose.Schema({
  ID: String,
  DOJ: String,
  status: String,
  gross: Number,
  bank: String,
  account: Number,
  gendar: String,
  blood: String,
  name: {
    type: String,
    required: true,
  },
  father: {
    type: String,
    required: true,
  },
  mother: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  nid: {
    type: Number,
    required: true,
  },
  birth: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  lastCompany: String,
  lastDepartment: String,
  lastDesignation: String,
  lastDegree: String,
  lastSubject: String,
  lastInstitute: String,
  lastGrade: Number,
  image: String,
  photo:String,
  qrUrl:String,
});

module.exports = employeesSchema;
