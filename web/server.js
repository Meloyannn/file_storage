const express = require("express"),
    bodyParser = require("body-parser"),
    cookieParser = require("cookie-parser"),
    path = require('path'),
    dotenv = require('dotenv'),
    request = require("request"),
    app = express()
    dotenv.config()
    PORT = process.env.PORT,
    API_URL = process.env.API_URL

app.use(cookieParser())
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, "build")))
app.get('/api/*',function (req, res) {
	request(`${API_URL}${req.params[0]}`,{headers:req.headers}).on('error', err => res.sendStatus(500)).pipe(res)
})
app.post('/api/*',function(req,res){
    request.post(`${API_URL}${req.params[0]}`,{json:req.body,headers:req.headers}).on('error', err => res.sendStatus(500)).pipe(res)
})
app.listen(PORT,function(){
    console.log(`Api listening on port ${PORT} `)
})