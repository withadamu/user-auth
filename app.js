// App configuration, requiring used modules
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');

// Initializing App
const app = express();

// Get User Model
const User = require('./model/User');

// Database configuration
mongoose.connect('mongodb://localhost:27017/user-auth', {useNewUrlParser: true});
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("User-auth is connected to the database");
});

// Setting the view engine to ejs
app.set("view engine", "ejs");

// Serving our static files
app.use(express.static(path.join(__dirname, 'assets')));

// Configures the Body-Parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Passport Setup
app.use(require('express-session')({
  secret: "nodejs user authenticate",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Set Global User variable
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

// Import and require routes
let IndexRoute = require("./route/Index");
let UserRoute = require("./route/User");

// Use imported routes
app.use("/", IndexRoute);
app.use("/user", UserRoute);

// Server Listener
app.listen(process.env.PORT || 8000, () =>
  console.log("Server is listening on port: 8000")
);
