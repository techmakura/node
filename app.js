const express = require("express");
// Imported express framework package
const path = require("path");

const app = express();
// Initialize

app.use(express.static(path.join(__dirname, 'public')));
// Middleware used to serve the static content. 


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
// Api response




app.listen(8080, () => {
    console.log("started server at port 8080")
});

