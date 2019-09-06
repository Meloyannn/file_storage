const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const localStratege = require('passport-local').Strategy;
const JWT_SECRET = process.env.SECRET_KEY
const { users } = require("./controllers/users")

const JwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('Token'),
    secretOrKey: JWT_SECRET
}
const LocalStrategyOptions = {
    usernameField: "email",
    passwordField: "password"
}
// Passport JWT strategy to check token
passport.use(new JwtStrategy(JwtOptions, function (payload, done) {
    // Find the user specified in token
    const email = payload.sub;

    // Also there is a need to discuss the role check necessity.
    //const role = payload.role;

    // TOBE disscussed: Check user existance in DB 
    // TODO: Will be checked user existance in DB. 
    isUser = users.some(users => users.email === email)

    if (!isUser) {
        return done(null, false);
    }

    // If there is no need to check user existance in DB only this line will be left.
    done(null, payload);

}));

passport.use("local", new localStratege(LocalStrategyOptions, function (email, password, done) {
    // Find the user given the eamil

    // Will be checked user existance in DB. 
    isUser = users.some(users => users.email === email)
    // If not handle it 
    if (!isUser) {
        return done(null, false);
    }
    // Check if the password is correct
    const user = users.find(users => users.email === email);

    if (password !== user.password) {
        done(null, false);
    }
    // Otherwise return the user

    done(null, user);
}));

module.exports = passport