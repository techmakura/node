const express = require("express");
// Imported express framework package
const path = require("path");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
require('dotenv').config();

const PORT = process.env.PORT;
const API_KEY = process.env.AUTH_TOKEN;
const MONGOURL = process.env.MONGO_URL || "mongodb://localhost:27017/spa";

mongoose
    .connect(MONGOURL)
    .then(() => {
        console.log("Successfully connected with mongodb");
        app.listen(PORT, () => {
            console.log(`started server at port: ${PORT}`)
        });
    }).catch(error => console.log(error))

const studentsSchema = mongoose.Schema({
    "name": String,
    "faculty": String,
    "phone": Number,
    "isActive": Boolean
});

const StudentsModel = mongoose.model("students", studentsSchema);

// mongoose
//     .connect(MONGOURL)
//     .then(() => {
//         console.log("Successfully connected to Mongodb");
//         app.listen(PORT, () => {
//             console.log(`started server at port: ${PORT}`)
//         });
//     }).catch((error) => console.log(error))

// const studentsSchema = mongoose.Schema({
//     name: String,
//     email: String
// });

// const StudentsModel = mongoose.model("students", studentsSchema);

const usersSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    phone: Number,
    isActive: Boolean
})

const UserModel = mongoose.model("users", usersSchema);

const app = express();
// Initialize

const data = [
    {
        "phone": "1-264-768-5798",
        "name": "David Garrett",
        "email": "ipsum@hotmail.ca",
        "region": "Northern Territory",
        "country": "United Kingdom"
    },
    {
        "phone": "(865) 421-4749",
        "name": "Quyn Lloyd",
        "email": "aenean.eget.magna@yahoo.ca",
        "region": "Valle d'Aosta",
        "country": "Vietnam"
    },
    {
        "phone": "(644) 436-4114",
        "name": "Karly Mccormick",
        "email": "penatibus.et.magnis@yahoo.ca",
        "region": "Vestfold og Telemark",
        "country": "Australia"
    },
    {
        "phone": "(287) 684-8794",
        "name": "Cairo George",
        "email": "elementum.purus.accumsan@outlook.com",
        "region": "Bình Dương",
        "country": "Canada"
    },
    {
        "phone": "1-121-558-1155",
        "name": "Sybil Gregory",
        "email": "feugiat.non@outlook.org",
        "region": "Kurgan Oblast",
        "country": "Australia"
    }
]

app.use(express.static(path.join(__dirname, 'public')));
// Middleware used to serve the static content. 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const authentication = (req, res, next) => {
    const token = req.headers.token;

    if (token != API_KEY) {
        res.status(401).send("Unauthorized!!!");
    }
    next();
}

// app.use(authentication);

app.get("/", async (req, res) => {
    console.log("directory name" + __dirname);
    const students = await StudentsModel.find();
    res.send(students);
})

app.get("/about", authentication, (req, res) => {
    const firstname = req.query.firstname;
    const lastname = req.query.lastname;
    const middlename = req.query.middlename;
    // res.send({"about":`firstname is: ${firstname}. Lastname is: ${lastname}`});
    res.send({
        "firstname": firstname,
        "middlename": middlename,
        "lastname": lastname
    })
})

app.post("/user", authentication, async (req, res) => {
    try {
        console.log(req + "req.body");
        // Get all the value from request body
        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        const email = req.body.email;
        const password = req.body.password;
        const phone = req.body.phone;

        // Stored all the value in a object
        const user_details = {
            "firstname": firstname,
            "lastname": lastname,
            "email": email,
            "password": password,
            "phone": phone,
            "isActive": true
        }

        try {
            const newUser = new UserModel(user_details);
            const savedUser = await newUser.save();
            console.log("User saved:", savedUser);

            res.status(201).json({
                message: "User saved successfully",
                user: savedUser
            });

        } catch (err) {
            console.error("Error saving user:", err);
        }
    } catch (err) {
        res.status(500).json({
            message: "Failed to save user",
            error: err.message
        });
    }
})

app.get("/students", async (req, res)=>{
    const students = await StudentsModel.find();
    res.send(students);
});

const save = (data) => {
    // Store in database.
    return true;
}

// app.get("/user-info", authentication, (req, res)=>{
//     res.status(200).json({"data": data});
// })

app.get("/user-info", authentication, (req, res) => {
    const email = req.query.email;
    const name = req.query.name;

    // const userWithProvidedEmail = data.filter(function(user) {
    //     return user.email === email;
    // });

    const userWithProvidedName = data.filter(function (user) {
        return user.name === name;
    });

    res.status(200).json({ "data": userWithProvidedName });
})


// Api response


