const express = require("express");
const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const router = express.Router();
const attendanceSchema = require("../schemas/attendanceSchema");
const Attendance = new mongoose.model("Attendance", attendanceSchema);


//Post entry time
router.post("/", async (req, res) => {
  const newAttendance = new Attendance(req.body);
  console.log(newAttendance)
  await newAttendance.save((err) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        message: "Attendance was inserted successfully!",
      });
    }
  });
});

//Get entry time
router.get("/", async (req, res) => {
  const page = req.query.page;
  const size = parseInt(req.query.size);
  console.log(page, size)
  let attendance;
  const count = await Attendance.where({}).count()
  try {
    if (page) {
      attendance = await Attendance.find({}).skip(page * size).limit(size);
    } else {
      attendance = await Attendance.find({})
    }

    res.status(200).json({
      data: attendance,
      count,
      message: "attendance Success",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "There was an error on the server side",
    });
  }
});

//Get single ID entry time
router.get("/:email", async (req, res) => {
  try {
    const data = await Attendance.find({ email: req.params.email });
    res.status(200).json({
      result: data,
      message: "Success",
    });
  } catch (err) {
    res.status(500).json({
      error: "There was a server side error!",
    });
  }
});

//Get single ID by date
router.get("/date/:date", async (req, res) => {
  try {
    const data = await Attendance.find({ date: req.params.date });
    console.log(data);
    res.status(200).json({
      result: data,
      message: "Success",
    });
  } catch (err) {
    res.status(500).json({
      error: "There was a server side error!",
    });
  }
});

//UPDATE Leave Time
router.put("/:_id", async (req, res) => {
  const result = await Attendance.findOneAndUpdate(
    { _id: req.params._id },
    {
      $set: {
        leave: new Date().toLocaleString().split(",")[1],
      },
    },
    {
      new: true,
      useFindAndModify: false,
    },
    (err) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error!",
        });
      } else {
        res.status(200).json({
          message: "Attendance was updated successfully!",
        });
      }
    }
  ).clone().catch(function (err) { console.log(err) })
  console.log(result);
});

// DELETE Attendance by holiday
router.delete("/:_id", async (req, res) => {
  await Attendance.deleteOne({ _id: req.params._id }, (err) => {
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