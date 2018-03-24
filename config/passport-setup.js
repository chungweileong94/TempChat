const passport = require("passport");
const FacebookStrategy = require("passport-facebook");

passport.use(new FacebookStrategy(
    {
        clientID: "",
        clientSecret: "",
        callbackURL: "http://locahost:8888/auth/facebook/callback"
    },
    (accessToken, refreshToken, profile, cb) => {
        
    }
));