const GoogleStrategy = require ('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const User = require ('../schemas/User');
const bcryptjs = require("bcryptjs");
require('dotenv').config({
    path: `./env-files/${process.env.GOOGLE_CLIENT_ID || 'OAuth'}.env`,
  });
module.exports = function(passport){
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:8000/google/callback',
        profileFields: ['email']
 
    },
async(accessToken, refreshToken, profile, done)=>{
  const salt = await bcryptjs.genSalt(10);

    let hashedPassword = await bcryptjs.hash(profile.name.givenName+'123', salt);
const newUser= {
  
  googleId:profile.id, 
  name: profile.name.givenName, 
  lastName: profile.name.familyName,
  userName:profile.displayName, 
  email:profile.emails[0].value,
  password:hashedPassword,
  avatar: profile.photos[0].value
}
try {
  let user= await User.findOne({googleId: profile.id})
  
    if(user){
      done(null,user)
    } else {
      user = await User.create(newUser) 
      done(null,user)
    }
  } catch (err) {
    console.error(err)
}
}))
passport.serializeUser((user, done) => {
    done(null, user.id);
  })
  
  passport.deserializeUser((id, done)=> {
    User.findById(id, (err, user) => done(err, user))
    })
  
}