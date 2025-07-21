const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Student = require('../model/Students');

// Get all students
router.get('/', auth, async (req, res) => {
    const students = await Student.find();
    res.send(students);
});

router.get("/faculty", auth, async (req, res)=>{
    const name = req.query.name;
    const active = req.query.active;
    try{
        // const student = await Student.find({ name: name, isActive: active}).exec()
        const query = { name: name };
        const response = await Student.findOneAndUpdate(query, { name: 'Ayush Joshi' });
        console.log(response)
        res.status(200).send(response);
    }catch(err){
        res.status(400).send(err);
    }
})

router.post("/", auth, async (req, res) => {
    const name = req.body.name;
    const faculty = req.body.faculty;
    const phone = req.body.phone;
    const isActive = req.body.isActive;

    const student = {
        "name": name,
        "faculty": faculty,
        "phone": phone,
        "isActive": isActive
    }

    try {
        const newUser = new Student(student);
        const savedUser = await newUser.save();
        res.status(201).json({"success":"New student created succesfully"});
    }
    catch(err){
        console.log(err);
        res.status(400).json({"error": err})
    }
})

module.exports = router;
