const express = require("express");
// const res = require("express/lib/response");
const mongoose = require("mongoose");
const router = express.Router();
const enrollSchema = require("../schemas/enrollSchema");
const Enroll = new mongoose.model("Enroll", enrollSchema);

// POST Enroll
router.post("/", async (req, res) => {
    const enrollCourse = new Enroll(req.body);
    try {
        const data = await enrollCourse.save((err) => {
            if (err) {
                res.status(500).json({
                    message: "there was a server site error",
                });
            }
        });
    } catch {
        res.status(200).json({
            message: "Course Enroll successfully",
        });
    }
});

// GET Enroll
router.get("/", async (req, res) => {
    try {
        const CourseEnroll = await Enroll.find({});
        res.status(200).json({
            data: CourseEnroll,
            message: "Enroll Success",
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "There was an error on the server side",
        });
    }
});


module.exports = router;