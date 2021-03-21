const { validationResult } = require("express-validator");
const User = require("../../schemas/User");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const { JSONCookie } = require("cookie-parser");
const session = require("express-session");


module.exports = async (req, res) => {
  try {
    let { email, password } = req.body;
    let user = await User.findOne({ email });
    let errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    if (!user)
      return res
        .status(404)
        .send("User with this e-mail hasn't been created yet");

    let doPasswordsMatch = await bcryptjs.compare(password, user.password);

    if (!doPasswordsMatch)
      return res.status(401).json({ msg: "Passwords do not match" });

    const payload = {
      user: {
        id: user._id,
      },
    };
 //react get token
 jwt.sign( 
   payload,
   config.get("jsonWebTokenSecret"), { expiresIn: 3600 },
   (err,token) => 
   { if (err) throw err; 
    res.json({ token });
  });
  //token for express cookie
const token = jwt.sign(payload,config.get("jsonWebTokenSecret"));
res.cookie('token',token,{maxAge:9000,httpOnly:true}).send();

 res.redirect('/dashboard');
  } catch (error) {
    console.error(error.message);

    return res.status(500).send("Server error.");
  }
 
   
 
};
