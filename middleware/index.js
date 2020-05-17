let middlewareObj = {};

middlewareObj.isSignedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/user/login");
};

module.exports = middlewareObj;