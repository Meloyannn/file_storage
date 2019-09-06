const express = require("express")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")

const { validateBody, schemas } = require("./helpers/routeHelpers");
//const passportConf = require("./passport")


const dotenv = require('dotenv')
const app = express()
dotenv.config()
const passport = require("./passport")
const UsersConroller=require("./controllers/users");
// const auth = require("./auth")
const port = process.env.PORT

app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Sine up user without authorization
app.post("/signup",validateBody(schemas.authschema), UsersConroller.signUp);

//Sign in user authorizate and get token

// app.use(passport.authenticate('local', {session: false}))
//app.post("/signin", validateBody(schemas.authschema), UsersConroller.signIn)
app.post("/signin",
validateBody(schemas.authschema), 
passport.authenticate('local', {session: false}),
UsersConroller.signIn, function (req, res, next){
    res.status(200); 
    next();
});

// app.use(passport.authenticate('jwt', {session: false}));
app.get("/test",
    passport.authenticate('jwt', {session: false}),
    function(req, res, next){
    console.log(req.body)
    res.status(200).json({message: "I'm here!"});
    next()
})


// app.use(auth.authenticate)
// app.get("/test",function(req,res){
//     // console.log(req.user)
//     // if(req.user.role !="admin") res.sendStatus(403)
//     res.sendStatus(200)
// })

app.listen(port,function(){
    console.log(`Api listening on port ${port} `)
})