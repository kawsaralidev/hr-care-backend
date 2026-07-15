const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const holidaySchema = require("../schemas/holidaySchema");
const Holiday = new mongoose.model("Holiday", holidaySchema);
const attendanceSchema = require("../schemas/attendanceSchema");
const Attendance = new mongoose.model("Attendance", attendanceSchema);

// //Post new holiday
router.post("/", async (req, res) => {
  const newHoliday = new Holiday(req.body);
  await newHoliday.save((err) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        message: "Holiday was inserted successfully!",
      });
    }
  });
});

//Get holiday
router.get("/", async (req, res) => {
  try {
    const holiday = await Holiday.find({});
    res.status(200).json({
      data: holiday,
      message: "holiday Success",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "There was an error on the server side",
    });
  }
});
// DELETE holiday
router.delete("/:_id", async (req, res) => {
  await Holiday.deleteOne({ _id: req.params._id }, (err) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        message: "Holiday was deleted successfully!",
      });
    }
  }).clone().catch(function (err) { console.log(err) })
});
module.exports = router;  