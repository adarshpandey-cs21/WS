//acquring user model
const user = require('../models/user');
const User=require('../models/user');
const fs=require('fs');
const path=require('path');


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
module.exports.update=async function(req,res){
    // if(req.user.id==req.params.id){
    //     User.findByIdAndUpdate(req.params.id,req.body)
    //         .then((user)=>{
    //             return res.redirect('back');
    //         })
    //         .catch((err)=>{
    //             console.log(err);
    //         })
    // }else{
    //     return res.status(401).send('Unauthorized ');
    // }

    if(req.user.id==req.params.id){
        try{
            let user=await User.findById(req.params.id);
            User.uploadedAvatar(req,res,function(err){
                    if(err){
                        console.log('***MulterError***',err);

                    }
                    // console.log(req.file);
                    user.name=req.body.name;
                    user.email=req.body.email;

                    if(req.file){
                        // this is saving the path of uploaded file into the avatar field in the user
                        
                        if(user.avatar){
                            fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                        }
                        user.avatar=User.avatarPath+'/'+req.file.filename
                    }
                    user.save();
                    return res.redirect('back');
            });
        }catch(err){
            req.flash('error',err);
            return res.redirect('back');
        }
        

    }else{
        req.flash('error','Unauthorized');
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