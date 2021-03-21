const express = require('express');

const router = express.Router();

const mountRegisterRoutes = require('../features/register/routes');
const mountLoginRoutes = require('../features/login/routes');
const mountLogoutRoutes = require('../features/logout/routes');
const mountResetPasswordRoutes = require('../features/reset-password/routes');
const mountProfileRoutes = require('../features/profile/routes');
const auth = require('../middleware/auth');
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  return res.redirect('/login');
}

/* GET home page. */
router.get('/dashboard',auth, (req, res) => {
  res.render('pages/dashboard');
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

module.exports = router;
