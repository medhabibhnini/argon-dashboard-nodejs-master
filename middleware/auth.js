const jwt = require('jsonwebtoken');
const config = require('config');

function auth(req,res,next)
{
try {
   
   const token= req.cookies.token;
   if(!token) return res.redirect("/login");
    const verified = jwt.verify(token,config.get("jsonWebTokenSecret"))
     console.log(verified);
    req.user = verified.user;
        //const userid = verified.user.id
     next();
} catch (error) {
        console.log(error)
        res.status(401).json({errorMessage:"Unauthorized"})
}
}
module.exports=auth;