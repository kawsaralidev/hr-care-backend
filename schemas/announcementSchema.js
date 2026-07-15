const mongoose = require("mongoose");

const announcementSchema = mongoose.Schema({
    ID: String,
    email: String,
    title: String,
    date: String,
    text: String,
    status: String,
});

module.exports = announcementSchema;
