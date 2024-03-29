"use strict";

// MongoDB
// Server node.js
// ------------------------------------------------------------------------------------------------------- //
// Our pattern is redesigned to Node.js and MVC pattern 
// ------------------------------------------------------------------------------------------------------- //
var express = require("express");

var mongoose = require("mongoose");

mongoose.Promise = require("bluebird");

var bodyParser = require('body-parser');

var nodemailer = require("nodemailer");

var handle_bar = require('express-handlebars');

var handle_bar2 = require("handlebars");

var session = require("express-session");

var cors = require('cors');

var cookieParser = require('cookie-parser');

var router = require("./Models/router"); // Exporting from 'router.js'


var MongoStore = require('connect-mongo')(session); // Connection to database to store the database


require("dotenv").config({
  path: 'config_modules/.env'
});

var app = express(); // Creating application object
// Setting up the middleware functions //
//********************************************************************************//

var HTTP_PORT = process.env.PORT || 8080;
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
  activeDuration: 1000 * 60
})); //                  MONGO CONNECTION                    //
//--------------------------------------------------------

mongoose.connect(process.env.Database_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(function () {
  console.log("Connected to MongoDBAtlas ");
});
mongoose.connection.on('err', function (err) {
  console.log("There is an error ".concat(err));
});
mongoose.connection.once('open', function () {
  console.log("Connection is success");
}); //              STATIC FILES
//--------------------------------------------------------

app.use(express["static"]("views"));
app.use(express["static"]("public")); //--------------------------------------------------------

app.engine('hbs', handle_bar({
  extname: '.hbs',
  helpers: {
    green: function green(data) {
      return '<strong style="color:#36ff00; background: gray; padding: 3px; display: inline-block; position: initial; border: aqua 5px outset; margin: 5px;">' + data.fn(this) + '</strong>';
    }
  }
}));
app.set('view engine', 'hbs');
app.use("/", router);
module.exports.transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.TO_EMAILS,
    pass: process.env.PASSWORD
  }
}); //********************************************************************************//
// ***********************     WE CHANGED TO MVC PATTERN     *************************************************//
// setup a 'route' to listen on the default url path (http://localhost)

app.use(function (req, res, next) {
  res.status(404).render('error', {
    layout: false
  });
}); // setup http server to listen on HTTP_PORT

app.listen(HTTP_PORT, function () {
  console.log("Express http server listening  on ".concat(HTTP_PORT));
});