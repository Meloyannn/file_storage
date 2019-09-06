const express = require("express");
const router = require("express-promise-router")();
const passport = require('passport');
const passportConf = require('../passport');

const { validateBody, schemas } = require("../helpers/routeHelpers");
const UsersConroller=require("../controllers/users");

router.route('/signup')
    .post(UsersConroller.signUp);
    // .post(validateBody(schemas.authschema), UsersConroller.signUp);

router.route('/signin')
    .post(validateBody(schemas.authschema), passport.authenticate('local', {session: false}), UsersConroller.signIn);

// router.route('/secret').get(function(req,res){
//     res.send("secret")
// });
// router.route('/test').get(function(req,res){
//     res.send("test")
// });



module.exports = router;