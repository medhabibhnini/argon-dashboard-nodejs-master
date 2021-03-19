const { wrap } = require('async-middleware');
const registerUser = require("../../functions/userFunctions/registerUser");
//const requestBodyValidation = require('./commands/verify-request-body');
const createUser = require('./commands/create-user');
const loadPage = require('./commands/load-page');
const {
  registerUserValidator,
  
} = require("../../middleware/express-validator/expressValidator");
module.exports = router => {
  router.get('/register', wrap(loadPage));

  //router.post('/register');
  router.post("/register", registerUserValidator, registerUser);
  return router;
};
