const registerRepo = require('../repository');
const { validationResult } = require("express-validator");
const User = require("../../../schemas/User");
const gravatar = require("gravatar");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");



async function createUser(req, res) {
  try {
    let { name, lastName, userName, email, password } = req.body;
    let user = await User.findOne({ email }).select("-password");
    let fetchedUserNameFromDatabase = await User.findOne({ userName }).select(
      "-password"
    );
    let errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    if (user) return res.status(401).send("User has already been created");

    if (fetchedUserNameFromDatabase === userName)
      return res.status(401).json("User name like is already been taken");

    const avatar = gravatar.url(email, {
      r: "pg",
      d: "mm",
      s: "200",
    });

    let newUser = new User({
      name,
      lastName,
      userName,
      email,
      password,
      avatar,
    });

    const salt = await bcryptjs.genSalt(10);

    let hashedPassword = await bcryptjs.hash(password, salt);

    newUser.password = hashedPassword;

    await newUser.save();

    const payload = {
      user: {
        id: newUser._id,
      },
    };

    jwt.sign(
      payload,
      config.get("jsonWebTokenSecret"),
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
       res.redirect('/login');
      }
    );
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Server error.");
  }
}

module.exports = createUser;
 /*let user = {};
  const registerSuccessMessage = 'You have successfully registered, you can now log in.';
  try {
    user = await registerRepo.createUser(req.body);
  } catch (error) {
    user = error;
  }
  if (user.email) {
    req.session.messages = { success: registerSuccessMessage };
    res.redirect('/login');
  }
  const { code } = user;
  const databaseError =
    code === '23505' ? 'The email has already been taken.' : 'Something went wrong.';
  req.session.messages = { databaseError };
  res.redirect('/register');*/