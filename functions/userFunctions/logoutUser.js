const { validationResult } = require("express-validator");
const User = require("../../schemas/User");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const { JSONCookie } = require("cookie-parser");
const session = require("express-session");

module.exports = (req,res)=>{
    res.cookie('token',"",{
        httpOnly: true,
        expires: new Date(0)
    })
    res.redirect('/login')
}