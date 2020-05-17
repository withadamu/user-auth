// App configuration, requiring installed modules
const express = require('express');
const router = express.Router();
const middleware = require('../middleware/index');

// The homepage routing
router.get("/", (req, res) => {
    res.render("home", {
        title: "User Authentication"
    });
});

// Dashboard route
router.get("/dashboard", middleware.isSignedIn, (req, res) => {
    res.render("dashboard", {
        title: "User Dashboard"
    });
});

// Exporting the router
module.exports = router;
