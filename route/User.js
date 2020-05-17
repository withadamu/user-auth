const express = require('express');
const router = express.Router();
const passport = require('passport');

// Get User Model
const User = require('../model/User');

// Get Register page route
router.get("/register", (req, res) => {
    res.render("register", {
        title: "User Register"
    });
});

// Register user logic
router.post("/register", (req, res) => {
    let newUser = new User ({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username
    });

    User.register(newUser, req.body.password)
    .then(registerUser => {
        passport.authenticate("local")(req, res, () => {
            console.log('Registered');
            res.redirect("/");
        });
    }).catch(error => {
        console.log(error);
        res.redirect("/user/register");
    });
});

// Get User Login Page
router.get("/login", (req, res) => {
    res.render("login", {
        title: "Login User"
    });
});

// Login user logic
router.post("/login", passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/user/login',
    failureFlash: true
}));

// Logout route
router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/user/login");
});

module.exports = router;
