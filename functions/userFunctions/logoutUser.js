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
  jwt.sign(
        "",
       "",
        { expiresIn:  Date.now() },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
}