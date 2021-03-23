const express = require('express');
const { wrap } = require('async-middleware');
const router = express.Router();
const User = require("../schemas/User");
const mountRegisterRoutes = require('../features/register/routes');
const mountLoginRoutes = require('../features/login/routes');
const mountLogoutRoutes = require('../features/logout/routes');
const mountResetPasswordRoutes = require('../features/reset-password/routes');
const mountProfileRoutes = require('../features/profile/routes');
const getUserByMiddleware = require("../functions/userFunctions/getUserByMiddleware");
const mountUpdateRoutes = require('../features/editprofile/routes')
const changeUserData = require('../functions/userFunctions/changeUserData');
const auth = require('../middleware/auth');
const loadPage = require('./load-page');
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  return res.redirect('/login');
}

/* GET home page. */
router.get('/dashboard',auth,wrap(loadPage), (req, res ) => {
let userInfo
  
  console.log(user);
  res.render('pages/dashboard',{userInfo : userInfo});
 
});

router.get('/icons', (req, res) => {
  res.render('pages/icons');
});

router.get('/maps', (req, res) => {
  res.render('pages/maps');
});

router.get('/tables', (req, res) => {
  res.render('pages/tables');
});


mountRegisterRoutes(router);
mountLoginRoutes(router);
mountLogoutRoutes(router);
mountResetPasswordRoutes(router);
mountProfileRoutes(router);
mountUpdateRoutes(router);


module.exports = router;
