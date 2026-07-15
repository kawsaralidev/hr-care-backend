const mongoose = require("mongoose");

const enrollSchema = mongoose.Schema({
    courseId: {
        type: String
    },
    email: {
        type: String
    },
    courseName: {
        type: String
    }
    ,
    author: {
        type: String
    }
    ,
    authorImg: {
        type: String
    }
    ,
    courseImg: {
        type: String
    }
});

module.exports = enrollSchema;