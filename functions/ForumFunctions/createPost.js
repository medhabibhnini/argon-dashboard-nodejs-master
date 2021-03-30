const { validationResult } = require("express-validator");
const Post = require("../../schemas/Post");
const User = require("../../schemas/User");

module.exports = async (req, res) => {
  let { textOfThePost } = req.body;
  
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  try {
    let user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json("User not found");
    let name = user.name;
    let lastName = user.lastName;
    let userName = user.userName;
    let newPost = new Post({
      name,
      lastName,
      userName,
      textOfThePost,
   
    });

    await newPost.save();

    res.json("Post is created, congratulations!");
  } catch (error) {
    console.error(error);
    return res.status(500).json("Server Error...");
  }
};
