const mongoose = require("mongoose");
const attendanceSchema = mongoose.Schema({
  ID: String,
  name: String,
  email: String,
  date: String,
  entry: String,
  leave: String,
  vacation: String,
  holiday: String,
  status: String,
});
module.exports = attendanceSchema;
