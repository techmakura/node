const express = require("express");
// Imported express framework package
const path = require("path");
const bodyParser= require('body-parser');
require('dotenv').config();

const PORT = process.env.PORT;
const API_KEY = process.env.AUTH_TOKEN;

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
app.use(bodyParser.urlencoded({extended:false}));

const authentication = (req, res, next) => {
    const token = req.headers.token;

    if(token != API_KEY){
        res.status(401).send("Unauthorized!!!");
    }
    next();
} 

// app.use(authentication);

app.get("/", (req, res) => {
    console.log("directory name" + __dirname);
    res.send("Hello world!!!");
})

app.get("/about", authentication, (req, res) => {
    const firstname = req.query.firstname;
    const lastname = req.query.lastname;
    const middlename = req.query.middlename;
    // res.send({"about":`firstname is: ${firstname}. Lastname is: ${lastname}`});
    res.send({
        "firstname":firstname, 
        "middlename":middlename,
        "lastname":lastname
    })
})

app.post("/user", authentication, (req, res)=>{
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
    return true;
}

// app.get("/user-info", authentication, (req, res)=>{
//     res.status(200).json({"data": data});
// })

app.get("/user-info", authentication, (req, res)=>{
    const email = req.query.email;
    const name = req.query.name;

    // const userWithProvidedEmail = data.filter(function(user) {
    //     return user.email === email;
    // });

    const userWithProvidedName = data.filter(function(user) {
        return user.name === name;
    });

    res.status(200).json({"data": userWithProvidedName});
})


// Api response

app.listen(PORT, () => {
    console.log(`started server at port: ${PORT}`)
});

