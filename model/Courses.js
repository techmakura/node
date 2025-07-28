
const mongoose = require("mongoose");

const CoursesSchema = mongoose.Schema({
    "name": String,
    "duration": Number,
    "eligibility": String,
    "code": String,
    "genre": Object
})

const CourseModel = mongoose.model("courses", CoursesSchema);

module.exports = CourseModel;