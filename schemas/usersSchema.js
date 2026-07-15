const mongoose = require("mongoose");

const usersSchema = mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "user",
    },
});

module.exports = usersSchema;
