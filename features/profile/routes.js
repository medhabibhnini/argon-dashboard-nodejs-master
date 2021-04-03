const { wrap } = require('async-middleware');

const loadPage = require('./commands/load-page');
const auth = require('../../middleware/auth');
const changeUserData = require('../../functions/userFunctions/changeUserData');
const getUserById = require("../../functions/userFunctions/getUserById");
module.exports = (router, middlewares = []) => {


  router.get('/profile/',auth, wrap(loadPage));

  //router.put( "/change_user_data/:user_data_to_change", auth, changeUserData);
  

  return router;
};
