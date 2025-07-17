const express = require("express");
// Imported express framework package
const path = require("path");
const bodyParser= require('body-parser');
require('dotenv').config();

const PORT = process.env.PORT;

const app = express();
// Initialize

app.use(express.static(path.join(__dirname, 'public')));
// Middleware used to serve the static content. 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.get("/", (req, res) => {
    console.log("directory name" + __dirname);
    res.send("Hello world!!!");
})

app.get("/about", (req, res)=>{
    const token = req.headers.token;
    const firstname = req.query.firstname;
    const lastname = req.query.lastname;
    const middlename = req.query.middlename;
    // res.send({"about":`firstname is: ${firstname}. Lastname is: ${lastname}`});
    res.send({
        "firstname":firstname, 
        "middlename":middlename,
        "lastname":lastname,
        "token":token
    })
})

app.post("/user", (req, res)=>{
    try{
        console.log(req + "req.body");
        // Get all the value from request body
        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        const email = req.body.email;
        const password = req.body.password;

        // Stored all the value in a object
        const user_details = {
            "firstname":firstname, 
            "lastname":lastname, 
            "email":email, 
            "password":password
        }

        let response; 
        // Stoe data in data base
        response = save(user_details);

        if(response){
        // If success
            res.status(201).json(user_details);
        } else{
            // If failure
            res.status(400).json(user_details)
        }
    }catch(err){
        console.log(err);
    }
})

const save = (data) => {
    // Store in database.
    return false;
}


// Api response

app.listen(PORT, () => {
    console.log(`started server at port: ${PORT}`)
});

