const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const leaveSchema = require("../schemas/leaveSchema");
const Leave = new mongoose.model("leave", leaveSchema);

//post leave application
router.post("/", async (req, res) => {
    const leave = new Leave({
        ...req.body,
    });

    try {
        const result = await leave.save();
        res.status(200).json({
            message: "Leave data was inserted successfully!",
            data: result,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "There was an error on the server side",
        });
    }
});
//get all leave
router.get("/", async (req, res) => {
    const page = req.query.page;
    const size = parseInt(req.query.size);
    let allLeave;
    const count = await Leave.where({}).count()
    try {
        if (page) {
            allLeave = await Leave.find({}).skip(page * size).limit(size);
        } else {
            allLeave = await Leave.find({});
        }

        res.status(200).json({
            data: allLeave,
            count,
            message: "Leave Success",
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "There was an error on the server side",
        });
    }
});

//approved leave application
router.put("/:_id", async (req, res) => {
    try {
        const updateLeave = await Leave.findByIdAndUpdate(
            { _id: req.params._id },
            {
                tripStart: req.body.tripStart,
                tripEnd: req.body.tripEnd,
                status: req.body.status,
            },
            { new: true }
        );

        res.status(200).send({ data: updateLeave });
        console.log(updateLeave);
    } catch {
        res.status(404).send({ message: "There was an error on the server side!" });
    }
});

// DELETE Leave
router.delete("/:_id", async (req, res) => {
    await Leave.deleteOne({ _id: req.params._id }, (err) => {
        if (err) {
            res.status(500).json({
                error: "There was a server side error!",
            });
        } else {
            res.status(200).json({
                message: "Holiday was deleted successfully!",
            });
        }
    })
        .clone()
        .catch(function (err) {
            console.log(err);
        });
});
module.exports = router;
