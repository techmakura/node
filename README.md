# Prerequisits
Install the packages
> npm i

Create a .env file & add all the required variables from the .example.env

# Running project
Start project in watch mode
>npm start

# Downloadlink for mongodb
https://www.mongodb.com/try/download/community

# Starting the mongo for mac
>brew services start mongodb-community@8.0

# Mongodb url
"mongodb://localhost:27017/demo" 


----------------------------------
Creating new node project
Create empty npm project
	# npm init --yes
Install dependencies
 npm i express mongoose dotenv, multer

Create a landling js file which will be hit by our server first. 

What should be included in the landing file ?
1. Import express, add required middlewares (Body parser, express static) (Create a .env file & store the sensetive & configureable variables in .env file like PORT, MONGOURL, API_KEY)
2. Connect with the mongodb url
3. Once mongodb connection is successfully established, use express to listen on the defined port. 
3. Use express to brach the incoming request into different route. 
    /genre 
    /publisher
    /book
    /author

4. Create Model folder & add file for each of the below:
    Genre.js
    Publisher.js
    Book.js
    Author.js

Add schema for each of them & each of them should export their own model. 

5. Create route folder & create file for each of them. Also create a auth middleware that will check if the provided api request has authentication token or not, only proceed for the request with valid token.
    genre.js
    publisher.js
    book.js
    author.js

Each route file should have routes for following:
1. get /genre (shoudl respond all the genere)
2. get /genre/:id (should respond the genere that matches id)
3. Post /genre/ (should create new genre)
4. Put /genre/:id (should update the genre with provided id)
5. Delete /genre/:id (should delete the genre with provided id)

=> Repeat same for each module. 