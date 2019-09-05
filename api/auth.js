const passport = require("passport")
const JwtStrategy = require("passport-jwt").Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const jwt = require("jsonwebtoken")
const localStrategy = require("passport-local").Strategy

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader("token"),
    secretOrKey: process.env.SECRET_KEY
};

passport.use("jwt",new JwtStrategy(jwtOptions, function (payload, done) {
    console.log(payload)
    done(null,payload)
}))
passport.use("local",new localStrategy(function(username,password,done){
    console.log(username)
    console.log(password) 
     done(null,{'username':"test"})
}))
// function authorization(req,res){
//     if(req.body.username == "admin" && req.body.password == "a") {
//         let payload = {
//             id:"1",
//             role:"user",
//             username:"admin",
//         }
//         res.status(200).json({
//             token:jwt.sign(payload,process.env.SECRET_KEY,{expiresIn:"2h"}
//         )})
//     }
//     else{
//         res.status(401).redirect("/login")
//     }
// }
module.exports = {
    authenticate:passport.authenticate('jwt',{session:false}),
    authorization:passport.authenticate("local",{session:false}),
}