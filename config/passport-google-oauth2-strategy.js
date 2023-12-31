const passport=require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');
const User=require('../models/user');


//tell passport to use a new strategy for google login
passport.use(new googleStrategy({
        clientID:"402678970365-tjamaeukjc0ebb3r11qot7sfem1gm1mk.apps.googleusercontent.com",
        clientSecret:"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",
        callbackURL:"http://localhost:8000/users/auth/google/callback"
    },

    function(accessToken,refreshToken,profile,done){
        //find a user
         User.findOne({email:profile.emails[0].value}).exec()
            .then((user)=>{
            
            // console.log(profile);

            if(user){
                //if found,set this user as req.user
                return done(null,user)
            }else{
                //if not found,create the user and set it as req.user
                User.create({
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    password:crypto.randomBytes(20).toString('hex')
                })
                .then((user)=>{
                        return done(null,user);
                    
                })
                .catch((err)=>{
                    console.log("error in creating user google strategy",err);
                     return;
                       
                })
            }
        })
        .catch((err)=>{
                console.log("error in google strategy",err);
                return;
        })
    }

))


module.exports=passport;