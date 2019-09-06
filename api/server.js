const dotenv = require('dotenv')
dotenv.config()
const express = require("express")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const { validateBody, schemas } = require("./helpers/routeHelpers");
const app = express()
const auth = require("./auth")
const UsersConroller=require("./controllers/users");
const port = process.env.PORT

app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post("/signup",validateBody(schemas.authschema), UsersConroller.signUp);
app.post("/signin",validateBody(schemas.authschema), auth.authenticate('local', {session: false}),UsersConroller.signIn);
app.use(auth.authenticate("jwt",{session:false}))

app.listen(port,function(){
    console.log(`Api listening on port ${port} `)
})