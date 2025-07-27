const mongoose = require("mongoose");

const StudentsSchema = mongoose.Schema({
    "name": String,
    "faculty": String,
    "phone": Number,
    "isActive": Boolean,
    "image": String
})

const StudentsModel = mongoose.model("students", StudentsSchema);

module.exports = StudentsModel;