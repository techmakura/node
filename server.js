const express = require("express");
const path = require("path");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
require('dotenv').config();

const studentRoutes = require("./routes/students")
const courseRoutes = require("./routes/courses");

const PORT = process.env.PORT;
const API_KEY = process.env.AUTH_TOKEN;
const MONGOURL = process.env.MONGO_URL || "mongodb://localhost:27017/spa"

mongoose
    .connect(MONGOURL)
    .then(() => {
        console.log("Successfully connected with mongodb");
        app.listen(PORT, () => {
            console.log(`started server at port: ${PORT}`)
        });
    }).catch(error => console.log(error))

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/students", studentRoutes);
app.use("/courses", courseRoutes)