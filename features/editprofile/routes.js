const { wrap } = require('async-middleware');

const loadPage = require('./commands/load-page');
const auth = require('../../middleware/auth');
const changeUserData = require('../../functions/userFunctions/changeUserData');
const updateimage = require('../../functions/userFunctions/updateimage');
const getUserById = require("../../functions/userFunctions/getUserById");
const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploads');
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}_${file.originalname}`;
    cb(null, fileName);
  },
});
const upload = multer({ storage });
module.exports = (router, middlewares = []) => {


  router.get('/update' , wrap(loadPage));

  router.post('/update_profile/',  auth , upload.single('avatar') , changeUserData  );




  return router;
};

