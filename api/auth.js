const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const localStratege = require('passport-local').Strategy;
const getUserByEmail = require("./models/users").getUserByEmail
const _ = require("underscore")
const JWT_SECRET = process.env.SECRET_KEY

const JwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('token'),
    secretOrKey: JWT_SECRET
}
const LocalStrategyOptions = {
    usernameField: "email",
    passwordField: "password"
}
// Passport JWT strategy to check token
passport.use("jwt", new JwtStrategy(JwtOptions, function (payload, done) {
    getUserByEmail(payload.email).then((result)=>{
        if (_.isEmpty(result)) {
            done(null, false)
        } else {

            done(null, payload) 
        } 
    }).catch(err=>{
        done(null, false);
    })
}));

passport.use("local", new localStratege(LocalStrategyOptions, function (email, password, done) {
    //will be added if needed.
}));

module.exports = passport