const { validationResult } = require("express-validator");
const User = require("../../schemas/User");


module.exports = async (req, res) => {
  User.findById(req.user.id)
  .then(user => {

      user.avatar = req.body.avatar;

      user.save() .then(() => res.redirect('/profile')).catch(err => res.status(400).json('Error: ' + err));
         
  })
  .catch(err => res.status(400).json('Error: ' + err));
}
