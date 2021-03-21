const { wrap } = require('async-middleware');

const verifyRequestBody = require('./commands/verify-request-body');
const login = require('./commands/login');
const redirectToDashboard = require('./commands/redirect-to-dashboard');
const loadPage = require('./commands/load-page');
const loginUser = require("../../functions/userFunctions/loginUser");
const getUserByMiddleware = require("../../functions/userFunctions/getUserByMiddleware");
const authentication = require("../../middleware/authentication");
const {

  loginUserValidator,
 
} = require("../../middleware/express-validator/expressValidator");

module.exports = router => {
  //router.post('/login', wrap(verifyRequestBody), wrap(login), wrap(redirectToDashboard));
  router.get('/login', wrap(loadPage));
 
  router.post("/login", loginUserValidator, loginUser);
  //router.get("/token", authentication, getUserByMiddleware);
  return router;
};
