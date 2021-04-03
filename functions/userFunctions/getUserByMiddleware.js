const User = require("../../schemas/User");

module.exports = async (req, res) => {
  try {
    let user = await User.findById(req.user.id).select("-password");
   //res.json(user);
   // console.log(user);
<<<<<<< Updated upstream
  
    
=======
   return res.json(user);
>>>>>>> Stashed changes
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Server error.");
  }
};
