const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Student = require('../model/Students');

// Get all students
router.get('/', auth, async (req, res) => {
    const students = await Student.find();
    res.send(students);
});

// Get a single student by ID
router.get('/:id', auth, async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) return res.status(404).json({ error: 'Student not found' });
        res.json(student);
    } catch (err) {
        res.status(400).json({ error: 'Invalid ID' });
    }
});

router.get("/faculty", auth, async (req, res) => {
    const name = req.query.name;
    const active = req.query.active;
    try {
        // const student = await Student.find({ name: name, isActive: active}).exec()
        const query = { name: name };
        const response = await Student.findOneAndUpdate(query, { name: 'Ayush Joshi' });
        console.log(response)
        res.status(200).send(response);
    } catch (err) {
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
        res.status(201).json({ "success": "New student created succesfully" });
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ "error": err })
    }
})

// Update a student by ID
router.put('/:id', auth, async (req, res) => {
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
        const updatedStudent = await Student.findByIdAndUpdate(
            req.params.id,
            student,
            { new: true, runValidators: true }
        );
        if (!updatedStudent) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.json({ success: 'Student updated', student: updatedStudent });
    } catch (err) {
        res.status(400).json({ error: err.message || 'Update failed' });
    }
});

module.exports = router;
