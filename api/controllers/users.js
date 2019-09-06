const JWT = require('jsonwebtoken');
const JWT_SECRET = process.env.SECRET_KEY
let users = [];

signToken = user => {
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
        const { email, password } = req.body;
        if (users.some(users => users.email === email)) {
            return res.status(403).json({"error": "Email is already in users."});
        }
        // User will be pushed to DB
        users.push({email, password});
        const token = signToken(req.body);
        res.status(200).json({token});
    },

    signIn: async(req, res, next) => {
        const token = signToken(req.user);
        res.status(200).json({token});
    },
    users:users
}