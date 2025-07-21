const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Course = require('../model/Courses');

// Get all Courses
router.get('/', auth, async (req, res) => {
    const Courses = await Course.find();
    res.send(Courses);
});

router.post("/", auth, async (req, res) => {
    const name = req.body.name;
    const duration = req.body.duration;
    const eligibility = req.body.eligibility;
    const code = req.body.code;

    const courseDetails = {
        "name": name,
        "duration": duration,
        "eligibility": eligibility,
        "code": code
    }

    try {
        const newUser = new Course(courseDetails);
        const savedCourse = await newUser.save();
        res.status(201).json({"success":"New Course created succesfully"});
    }
    catch(err){
        console.log(err);
        res.status(400).json({"error": err})
    }
})

module.exports = router;
