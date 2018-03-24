const router = require("express").Router();
const passport = require("passport");

router.get("/facebook", (req, res) => {
    passport.authenticate("facebook");
});

router.get("/facebook/callback",
    passport.authenticate("facebook"),
    (req, res) => {
        res.redirect("/");
    }
);