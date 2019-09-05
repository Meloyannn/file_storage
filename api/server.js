const express = require("express")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const dotenv = require('dotenv')
const app = express()
dotenv.config()
const auth = require("./auth")
const port = process.env.PORT

app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post("/signin",auth.authorization)
// app.use(auth.authenticate)
app.get("/test",function(req,res){
    // console.log(req.user)
    // if(req.user.role !="admin") res.sendStatus(403)
    res.sendStatus(200)
})
app.listen(port,function(){
    console.log(`Api listening on port ${port} `)
})