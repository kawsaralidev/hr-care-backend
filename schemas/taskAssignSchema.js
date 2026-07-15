const mongoose = require("mongoose");
const taskAssignSchema = mongoose.Schema({
  ID: String,
  name: String,
  email: String,
  // task: [String],
  tags: [
    {
      type: String,
    },
  ],
  date: String,
  startTime: String,
  endTime: String,
  taskDone: [String]
});
module.exports = taskAssignSchema;
