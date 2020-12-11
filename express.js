// MongoDB
// Server node.js
// ------------------------------------------------------------------------------------------------------- //
// Our pattern is redesigned to Node.js and MVC pattern 
// ------------------------------------------------------------------------------------------------------- //
const express = require("express");
const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");
const bodyParser = require('body-parser');
const nodemailer = require("nodemailer");
const handle_bar = require('express-handlebars');
const handle_bar2 = require("handlebars");
const session = require("express-session");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const router = require("./Models/router"); // Exporting from 'router.js'
const MongoStore = require('connect-mongo')(session); // Connection to database to store the database
require("dotenv").config({
     path: 'config_modules/.env'
 });
var app = express(); // Creating application object

// Setting up the middleware functions //
//********************************************************************************//
const userEmail = "web322.kamyab@gmail.com"
const PasswordEmail = "Javad12345$"
var  HTTP_PORT =process.env.PORT || 8080;
app.use(bodyParser.urlencoded({
    extended: false
})); // Setting project configuration
app.use(bodyParser.json()); // Converting any upcoming  json data

// Creating the session
//--------------------------------------------------------
app.use(cors());
app.use(cookieParser());
app.use(session({
    cookieName: "session",
    secret: 'positronx',
    saveUninitialized: false,
    resave: false,
    duration: 2 * 60 * 10000,
    activeDuration: 1000 * 60,
    
}));
//                  MONGO CONNECTION                    //
//--------------------------------------------------------
mongoose.connect(process.env.Database_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log("Connected to MongoDBAtlas ");
})

mongoose.connection.on('err', (err) => {
    console.log(`There is an error ${err}`);
});
mongoose.connection.once('open', () => {
    console.log("Connection is success");
})
//              STATIC FILES
//--------------------------------------------------------
app.use(express.static("views"));
app.use(express.static("public"));
//--------------------------------------------------------
app.engine('hbs', handle_bar({
    extname: '.hbs',
    helpers: {
        green: function (data) {
            return '<strong style="color:#36ff00; background: gray; padding: 3px; display: inline-block; position: initial; border: aqua 5px outset; margin: 5px;">' + data.fn(this) + '</strong>';
        }
    }
}));
app.set('view engine', 'hbs');
app.use("/", router);
module.exports.transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: userEmail,
        pass: PasswordEmail
    }
});
//********************************************************************************//
// ***********************     WE CHANGED TO MVC PATTERN     *************************************************//
// setup a 'route' to listen on the default url path (http://localhost)


app.use(function (req, res, next) {
    res.status(404).render('error', {
        layout: false
    });

});
// setup http server to listen on HTTP_PORT
app.listen(HTTP_PORT, function () {

    console.log(`Express http server listening  on ${HTTP_PORT}`);

});