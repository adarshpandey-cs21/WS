const Post=require('../models/post');

const User=require('../models/user');

module.exports.home=async function(req,res){
    // return res.end('<h1> Express is up for Codeial!! </h1>');

    // console.log(req.cookies); //for cookies
    // res.cookie('adarsh',87);
   try{
    let posts=await Post.find({})
        .populate('user')
        .populate({
            path:'comments',
            populate:{
                path:'user'
            }
        });

        let users=await User.find({});
        
        return res.render('home',{
            title:"Codeial | Home",
            posts:posts,
            all_users:users

        });
    }catch(err){
        console.log(err);
        return;
    }

    //rendering ejs file
    // return res.render('home',{
    //     title:"Home"
    // })
}