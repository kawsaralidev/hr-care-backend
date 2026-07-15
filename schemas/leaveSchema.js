const mongoose = require("mongoose");

const leaveSchema = mongoose.Schema({

    ID: {
        type: String,
        required: true,
    },
    name: {
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
    email: {
        type: String,
        required: true,
    },
    leaveType: {
        type: String,
        required: true,
    },
    leaveDays: {
        type: String,
        required: true,
    },
    tripStart: {
        type: String,
        required: true,
    },
    tripEnd: {
        type: String,
        required: true,
    },
    daysNumber: {
        type: String
    },
    message: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "pending"
    }

});


module.exports = leaveSchema;
