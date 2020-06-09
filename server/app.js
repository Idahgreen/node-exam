const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
var session = require('express-session');
var sessionstore = require('sessionstore');



app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser('secret'))
app.use(session({
    store: sessionstore.createSessionStore(),
    secret: 'lion',
    name: 'test',
    resave: false,
    unset: 'destroy',
    proxy: true,
    saveUninitialized: true,
    cookie: { 
        maxAge: 1000 * 60 * 60 * 24,
        path: '/',
        secure: false,
        httpOnly: false
    }
  }));

  

/* Setup the database */

const { Model } = require('objection');
const Knex = require('knex');
const knexFile = require("./knexfile.js");

const knex = Knex(knexFile.development);

// Give the knex instance to objection.
Model.knex(knex);

// Limit the amount of requests on the auth routes
// const rateLimit = require("express-rate-limit");

// const authLimiter = rateLimit({
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     max: 4 // limit each IP to 4 requests per windowMs
// });

// app.use("/users/login", authLimiter);
// app.use("/users/register", authLimiter);


/* Set up routes with our server instance */
const usersRoute = require("./routes/users.js");
const emailRoute = require("./routes/mail.js")
const ingredientRoute = require("./routes/ingredients.js")
const apiRoute = require("./routes/api.js")

// only use the custom middleware for the secondpath route
app.use(usersRoute);
app.use(emailRoute);
app.use(ingredientRoute);
app.use(apiRoute);

// Send information to the client


/* Start the server */

const port = process.env.PORT || 9090;

const server = app.listen(port, (error) => {
    if (error) {
        console.log("Error running Express");
    }
    console.log("Server is running on port", server.address().port);    
});

