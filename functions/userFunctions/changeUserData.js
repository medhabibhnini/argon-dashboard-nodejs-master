const { validationResult } = require("express-validator");
const User = require("../../schemas/User");


module.exports = async (req, res) => {
  User.findById(req.user.id)
  .then(user => {
      user.name = req.body.name;
      user.lastName = req.body.lastName;
      user.userName = req.body.userName;
      user.email = req.body.email;
      user.avatar = req.file.filename;

      user.save()
          .then(() => res.redirect('/profile'))
          .catch(err => res.status(400).json('Error: ' + err));
         
  })
  .catch(err => res.status(400).json('Error: ' + err));
}
/*
function getBoundary(request) {
  let contentType = request.headers['content-type']
  const contentTypeArray = contentType.split(';').map(item => item.trim())
  const boundaryPrefix = 'boundary='
  let boundary = contentTypeArray.find(item => item.startsWith(boundaryPrefix))
  if (!boundary) return null
  boundary = boundary.slice(boundaryPrefix.length)
  if (boundary) boundary = boundary.trim()
  return boundary
}
*/






/*const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploads');
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}_${file.originalname.replace(/\s+/g, '-')}`;
    cb(null, fileName);
  },
});
const upload = multer({ storage : storage }).single('avatar');*/
/*
module.exports = async (req, res) => {
  try {
    const { changeUserData } = req.body;
    console.log(changeUserData);
    const errors = validationResult(req);
    let user = await User.findById(req.user.id).select("-password");

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    if (!user) return res.status(404).json("User not found");

    //userDataToChange -> name,lastName,userName

    let userDataToChange = req.params.user_data_to_change;

    if (user[userDataToChange] === changeUserData)
      return res.status(401).json("This is the same data that is already in database");

    user[userDataToChange] = changeUserData;

    await user.update();
    console.log(user);

    //res.json("Data is changed");
    res.redirect('/profile');
  } catch (error) {
    console.error(error);
    return res.status(500).json("Server Error...");
  }
};
*/