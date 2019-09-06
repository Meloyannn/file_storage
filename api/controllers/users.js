const JWT = require('jsonwebtoken');
//const User = require('../models/user');
//const { JWT_SECRET } = require('../configuration');
const JWT_SECRET = process.env.SECRET_KEY
let users = [];

signToken = user => {
    console.log(JWT_SECRET)
    return JWT.sign({
        iss: "Arman",
        sub: user.email,
        role: "user",
        iat: new Date().getTime(), //Current date
        exp: new Date().setDate(new Date().getDate() + 1)
    }, JWT_SECRET);
}

module.exports = {
    signUp: (req, res, next) => {
        console.log("UserController.signUp() colled!");
        const { email, password } = req.value.body;
        if (users.some(users => users.email === email)) {
            return res.status(403).json({"error": "Email is already in users."});
        }
        // User will be pushed to DB
        users.push({email, password});
        const token = signToken(req.user);
        res.status(200).json({token});
    },

    signIn: async(req, res, next) => {
        console.log("UserController.signIn() colled!");
        const token = signToken(req.user);
        res.status(200).json({token});
        console.log("Successful login");
    },

    secret: async(req, res, next) => {
        console.log("I managed to get here");
        res.json({secret: "resources"});
    },
    users:users
}

                         