const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const employeesSchema = require("../schemas/employeesSchema");
const Employees = new mongoose.model("employee", employeesSchema);
const fileUpload = require("express-fileupload");
// POST A Employees
router.post("/", async (req, res) => {
  const newEmployees = new Employees(req.body);

  await newEmployees.save((err) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        message: "Employee was inserted successfully!",
      });
    }
  });
});

// Get employees
router.get("/", async (req, res) => {
  const allEmployees = await Employees.find({})
    .select({ photo: 0 })
    .exec((error, data) => {
      if (error) {
        res.status(500).json({
          error: "There was a server side error!",
        });
      } else {
        res.status(200).json({
          result: data,
          message: "Employee was inserted successfully!",
        });
      }
    });
});


// Get employees without all pic
router.get("/rp", async (req, res) => {
  const allEmployees = await Employees.find({})
    .select({ photo: 0, image: 0, qrUrl: 0 })
    .exec((error, data) => {
      if (error) {
        res.status(500).json({
          error: "There was a server side error!",
        });
      } else {
        res.status(200).json({
          result: data,
          message: "Employee was inserted successfully!",
        });
      }
    });
});


//Get single employee by email
router.get("/photo/:email", async (req, res) => {
  console.log(req.headers.authorization);
  try {
    const data = await Employees.find({ email: req.params.email });
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
//get without image
router.get("/:email", async (req, res) => {
  const data = await Employees.find({ email: req.params.email })
    .select({ photo: 0 })
    .exec((error, data) => {
      if (error) {
        res.status(500).json({
          error: "There was a server side error!",
        });
      } else {
        res.status(200).json({
          result: data,
          message: "Employee was inserted successfully!",
        });
      }
    });
});

//UPDATE Employee Info
router.put("/:_id", async (req, res) => {
  try {
    const updateEmployee = await Employees.findByIdAndUpdate(
      req.params._id,
      req.body
    );
    const result = await updateEmployee.save();
    res.status(200).send({ result, data: updateEmployee });
    console.log(updateEmployee);
  } catch {
    res.status(404).send({ error: "Employee is not found!" });
  }
});
//ChangeImage method
router.put("/profile/:email", async (req, res) => {
  const pic = req.files.photo;
  const picData = pic.data;
  const encodedPic = picData.toString("base64");
  // const imageBuffer = Buffer.from(encodedPic, "base64");
  const photoURL = { photo: encodedPic };
  const filter = { email: req.params.email };
  try {
    const updateEmployee = await Employees.findOneAndUpdate(filter, photoURL);
    const result = await updateEmployee.save();
    res.status(200).send({ result, data: updateEmployee });
    console.log(updateEmployee);
  } catch {
    res.status(404).send({ error: "Employee is not found!" });
  }
});

module.exports = router;
