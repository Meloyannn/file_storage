const JWT = require('jsonwebtoken');
const JWT_SECRET = process.env.SECRET_KEY
const md5 = require('md5')
const getUserByEmail = require("../models/users").getUserByEmail
const insertUser = require("../models/users").insertUser
const getUserItems = require("../models/users").getUserItems
const _ = require("underscore")

signToken = user => {
    return JWT.sign({
        id: user.user_id,
        email: user.email,
        role: user.role,
    }, JWT_SECRET,{expiresIn:"2h"});
}
module.exports = {
    signUp:  (req, res, next) => {
        const { email, password } = req.body;
        getUserByEmail(email).then((result)=>{
                if (_.isEmpty(result)){
                    let passwordEncripted = md5(password)
                    insertUser({email, passwordEncripted})
                        .then( result => {
                            const Token = signToken(result)
                            res.status(200).json({"token":Token, "email":email})
                        })
                        .catch((err)=>{
                            console.log(err)
                            res.status(503).json({error: err})
                        }) 
                } else {
                    res.status(409).json({error: "Account already exists"}) 
                }
            }
        ) 
    },

    signIn: (req, res) => {        
        const { email, password } = req.body;
        getUserByEmail(email).then((result)=>{
            if (_.isEmpty(result)){
                res.status(409).json({error: "Account not registered"})      
            } else {
                let passwordEncripted = md5(password)
                if (passwordEncripted === result[0].password) {
                    const Token = signToken(result[0])
                    res.status(200).json({"token":Token, "email":email } )
                } else {
                    res.status(409).json({error: "Password is incorrect"})
                }
            }
        }).catch(err=>{
            console.log(err)
            res.status(503).json({error: err})
        })
    },

    getItems: (req, res) => {
        console.log(req.user.id)
        getUserItems(req.user.id).then(result=>{
            console.log(result)
            res.status(200).send(result)
        })
    }
}