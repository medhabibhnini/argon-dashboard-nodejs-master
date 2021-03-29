const facebookStrategy = require ('passport-facebook').Strategy;
const express = require('express');
const passport = require('passport');
const User = require ('../schemas/User');
const bcryptjs = require("bcryptjs");
require('dotenv').config({
    path: `./env-files/${process.env.FB_CLIENT_ID || 'OAuth'}.env`,
  });
module.exports = function(passport){
 
    passport.use(new facebookStrategy({
   
     // pull in our app id and secret from our auth.js file
     clientID        :process.env.FB_CLIENT_ID,
     clientSecret    : process.env.FB_CLIENT_SECRET,
     callbackURL     : "http://localhost:8000/facebook/callback",
     profileFields   : ['id','displayName','name','picture.type(large)','email']
   },// facebook will send back the token and profile
   
   async(token, refreshToken, profile, done) =>{
    const salt = await bcryptjs.genSalt(10);

    let hashedPassword = await bcryptjs.hash(profile.name.givenName+'123', salt);
    const newUser= {
  
        facebookId:profile.id, 
        name: profile.name.givenName, 
        lastName: profile.name.familyName,
        userName:profile.displayName, 
        email:profile.emails[0].value,
        password:hashedPassword,
        avatar: profile.photos[0].value
      }
      try {
        let user= await User.findOne({profile})
        
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
    
   };
  

   passport.serializeUser(function(user, done) {
   done(null, user.id);
   });
   
   // used to deserialize the user
   passport.deserializeUser(function(id, done) {
   User.findById(id, function(err, user) {
       done(err, user);
   });
   });
