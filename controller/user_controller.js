//acquring user model
const User=require('../models/user');

module.exports.profile=function(req,res){
    // return res.end('<h1>user profile click to follow lol</h1>')

    User.findOne({ _id: req.params.id })
        .then((user)=>{
            return res.render('usersProfile',{
                title:"usersProfile!" ,
                profile_user:user
            })
        })
        .catch((err)=>{
            console.log(err);
        })

    
}
//for update
module.exports.update=function(req,res){
    if(req.user.id==req.params.id){
        User.findByIdAndUpdate(req.params.id,req.body)
            .then((user)=>{
                return res.redirect('back');
            })
            .catch((err)=>{
                console.log(err);
            })
    }else{
        return res.status(401).send('Unauthorized ');
    }
}

//render the sign up page

module.exports.signUp=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up',{
        title:"Codeial | Sign Up"
    })

}

//render the sign page

module.exports.signIn=function(req,res){
    if(req.isAuthenticated()){
       return res.redirect('/users/profile');
    }
    return res.render('user_sign_in',{
        title:"Codeial | Sign In"
    })

}

//get the sign up data
module.exports.create=function(req,res){
    if(req.body.password!=req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email: req.body.email})
    .then((user)=>{
        
        if(!user){
            User.create(req.body)
            .then((user)=>{
                return res.redirect('/users/sign-in');
            })
            .catch((err)=>{
                
                console.log('error in creating signining up ');
                return;
            })
        }else{
            return res.redirect('back');
        }
    })
    .catch((err)=>{
        console.log('error in signining up ');
    })
    
}

//sign in and create a session for user 
module.exports.createSession=function(req,res){
    req.flash('success','Logged in successfully');
    return res.redirect('/');
}

//sign out

module.exports.destroySession=function(req,res){
    req.logout(function(err){
        if(err){
            return next(err);
        }
    });
    req.flash('success','You have logged out');
    return res.redirect('/');
}