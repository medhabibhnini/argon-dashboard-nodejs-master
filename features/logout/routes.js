const { wrap } = require('async-middleware');

const  logout  = require('../../functions/userFunctions/logoutUser');

module.exports = (router, middlewares = []) => {
  router.post('/logout', middlewares.map(middleware => wrap(middleware)), wrap(logout));

  return router;
};
