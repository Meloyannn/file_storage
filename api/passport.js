const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const localStratege = require('passport-local').Strategy;
// const { JWT_SECRET } = require('./configuration');
const JWT_SECRET = process.env.SECRET_KEY
const { users } = require("./controllers/users")

// Passport JWT strategy to check token
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('token'),
    secretOrKey: JWT_SECRET
}, async(payload, done) => {
    try {
        // Find the user specified in token
        const email = payload.sub;

        // Also there is a need to discuss the role check necessity.
        //const role = payload.role;

        // TOBE disscussed: Check user existance in DB 
        // TODO: Will be checked user existance in DB. 
        isUser = users.some(users => users.email === email)

        if ( !isUser ) {
            return done(null, false);
        }

        // If there is no need to check user existance in DB only this line will be left.
        done(null, payload);

    } catch(error) {
        done(error, false);
    }
}));

passport.use("local",new localStratege({
    usernameField: "email",
    passwordField: "password"
}, (email, password, done) => {
    try{
        // Find the user given the eamil

        // Will be checked user existance in DB. 
         isUser = users.some(users => users.email === email)

        // If not handle it 
        if (!isUser) {
            return done(null, false);
        }

        // Check if the password is correct
        const user = users.find(users => users.email === email);
        console.log(users);

        if ( password !== user.password ) {
            console.log("password is incorrect");
            done(null, false);
        }
        // Otherwise return the user

        done(null, user);
    } catch(error) {
        done(error, false);
    }

} ));
module.exports = passport