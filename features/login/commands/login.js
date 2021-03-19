const debug = require('debug')('express:login');
const passport = require('passport');
const { validationResult } = require("express-validator");
const User = require("../../../schemas/User");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const {
  USERNAME_PASSWORD_COMBINATION_ERROR,
  INTERNAL_SERVER_ERROR,
  SUCCESSFULLY_LOGGED_IN,
} = require('../constants');


async function login(req, res, next) {try {
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

  jwt.sign(
    payload,
    config.get("jsonWebTokenSecret"),
    { expiresIn: 3600 },
    (err, token) => {
      if (err) throw err;
      res.json({ token });
    }
  );
} catch (error) {
  console.error(error.message);
  return res.status(500).send("Server error.");
}

}

module.exports = login;
/*function login(req, res, next) {
  debug('login');
  return passport.authenticate('local', (error, user) => {
    if (error || !user) {
      req.session.messages = {
        errors: { invalidEmailOrPassword: USERNAME_PASSWORD_COMBINATION_ERROR },
      };
      return res.status(401).redirect('/login');
    }

    return req.logIn(user, loginError => {
      if (loginError) {
        req.session.messages = {
          errors: { internalServerError: INTERNAL_SERVER_ERROR },
        };
        return res.status(500).redirect('/login');
      }
      req.session.messages = { loggedIn: SUCCESSFULLY_LOGGED_IN };
      return next();
    });
  })(req, res, next);
}*/