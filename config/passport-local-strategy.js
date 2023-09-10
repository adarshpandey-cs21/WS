const passport=require('passport');

const LocalStrategy=require('passport-local').Strategy;

const User=require('../models/user');

//authentication using passport
passport.use(new LocalStrategy({
        usernameField:"email"
    },
    function(email,password,done){
        //find a user  and established the identity
        User.findOne({email:email})
            .then((user)=>{
                if(!user || user.password!=password){
                     console.log('Invalid username and password!!');
                     done(null,false);
                }
                return done(null,user);
            })
            .catch((err)=>{
                console.log(err);
            })
    }
))

//serialize the user to decide which key is to be kept in cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
})
//deserialize the user from the key in the cookie
passport.deserializeUser(function(id,done){
    User.findById(id)
        .then((user)=>{
            return done(null,user);
        })
        .catch((err)=>{
            console.log(err);
        })
})

//check if the user is authenticated or not

passport.checkAuthentication=function(req,res,next){
    //if the user is signed in, then pass on the request to the next function(controller action)
     if(req.isAuthenticated()){
        return next();
     }

     //if the user is not signed in
     return res.redirect('/users/sign-in');

}

passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user=req.user;

    }
    next();
}
module.exports=passport;