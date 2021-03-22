const user = require('../functions/userFunctions/getUserByMiddleware');
//const auth = require("../../../middleware/auth")
const User = require("../schemas/User");
//const { FETCH_INFO_ERROR_MESSAGE } = require('../constants');

async function loadPage(req, res) {
  let userInfo;

  //const  user  = req.user;
  try {
    userInfo  = await User.findById(req.user.id).select("-password"); 
   
  } catch (getUserError) {
   // req.session.messages = { databaseError: FETCH_INFO_ERROR_MESSAGE };
  }
 console.log(userInfo);
  req.session.userInfo = { ...userInfo };
  res.render('pages/dashboard',{userInfo : userInfo});
}

module.exports = loadPage;
