const Post=require('../models/post');

const User=require('../models/user');

module.exports.home=function(req,res){
    // return res.end('<h1> Express is up for Codeial!! </h1>');

    // console.log(req.cookies); //for cookies
    // res.cookie('adarsh',87);

    Post.find({})
        .populate('user')
        .populate({
            path:'comments',
            populate:{
                path:'user'
            }
        })
        .exec()    //of each post for not populate ->find({}).then().err
        .then((posts)=>{
            User.find({})
            .then((users)=>{
                
            return res.render('home',{
                title:"Codeial | Home",
                posts:posts,
                all_users:users
            });
            })
            .catch((err)=>{
                console.log("error");
            })
        })
        .catch((err)=>{
            console.log(err);
        })
    //rendering ejs file
    // return res.render('home',{
    //     title:"Home"
    // })
}