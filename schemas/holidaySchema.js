const mongoose = require("mongoose");
const holidaySchema = mongoose.Schema({
  title: String,
  days: Number,
  startDate: String,
  endDate:String,
});
module.exports = holidaySchema;
