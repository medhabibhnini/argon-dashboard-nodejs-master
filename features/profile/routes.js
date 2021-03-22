const { wrap } = require('async-middleware');

const requestBodyValidation = require('./commands/verify-request-body');
const updateUserInfo = require('./commands/update-user-info');
const getUserByMiddleware = require("../../functions/userFunctions/getUserByMiddleware");
const loadPage = require('./commands/load-page');
const userid = require ('../../middleware/auth');
const auth = require('../../middleware/auth');
module.exports = (router, middlewares = []) => {


  router.get('/profile/',auth, wrap(loadPage));


  return router;
};
