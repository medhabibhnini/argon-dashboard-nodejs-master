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
const passport = require('passport');
const loadPage = require('./load-page');
const multer = require('multer');
const passportfb = require('../config/passportfb');
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  return res.redirect('/login');
}
// @desc Auth with Google
// @route GET /auth/google
router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}))

// @desc Google auth callback 
// @route GET /auth/google/callback

router.get(
  '/google/callback', 
  passport.authenticate('google', {failureRedirect: '/'}), 
  (req, res) => {
    res.redirect('/dashboard')
  }
)

// @desc Auth with Facebook
// @route GET facebook
router.get('/facebook', passport.authenticate('facebook', { scope : 'email'}))

// @desc Facebook auth callback 
// @route GET facebook/callback

router.get(
  '/facebook/callback', 
  passport.authenticate('facebook', {failureRedirect: '/'}), 
  (req, res) => {
    res.redirect('/dashboard')
  }
)

/* GET home page. */
router.get('/dashboard',auth,wrap(loadPage), (req, res ) => {
let userInfo
  
  console.log(user);
  res.render('pages/dashboard',{userInfo : userInfo});
 
});

router.get('/icons',auth,wrap(loadPage), (req, res) => {
  res.render('pages/icons');
});

router.get('/maps',auth,wrap(loadPage), (req, res) => {
  res.render('pages/maps');
});

router.get('/tables',auth,wrap(loadPage), (req, res) => {
  res.render('pages/tables');
});
/*const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploads');
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}_${file.originalname}`;
    cb(null, fileName);
  },
});
const upload = multer({ storage }).single('avatar');
router.post('/upload',upload,(req,res)=>{
  console.log(req.file);
  res.send("image uploaded");
})
*/
mountRegisterRoutes(router);
mountLoginRoutes(router);
mountLogoutRoutes(router);
mountResetPasswordRoutes(router);
mountProfileRoutes(router);
mountUpdateRoutes(router);



module.exports = router;
