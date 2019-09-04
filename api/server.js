const express = require("express"),
      bodyParser = require("body-parser"),
      cookieParser = require("cookie-parser"),
      dotenv = require('dotenv')
      dotenv.config(),
      port = process.env.PORT
      app = express()

app.use(cookieParser())
app.use(bodyParser.json())

app.listen(port,function(){
    console.log(`Api listening on port ${port} `)
})