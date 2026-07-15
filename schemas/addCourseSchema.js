const mongoose = require("mongoose");

const addCourseSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    des: {
        type: String,
        required: true,
    },
    courseImg: {
        type: String,
        required: true
    },
    topic: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    authorImg: {
        type: String,
        required: true
    },
});

module.exports = addCourseSchema;