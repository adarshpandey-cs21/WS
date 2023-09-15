const Post=require('../models/post');
const Comment=require('../models/comment');
module.exports.create=function(req,res){
    Post.create({
        content:req.body.content,
        user:req.user._id
    }).then((post)=>{
        return res.redirect('back');
    }).catch((err)=>{
        console.log(err);

    })
    
}


module.exports.destroy=function(req,res){
    Post.findOne({ _id: req.params.id })
        .then((post)=>{
            //.id means converting object id into string
            if(post.user==req.user.id){
                post.remove();

                Comment.deleteMany({post:req.params.id})
                        .then(()=>{
                            return res.redirect('back');
                        })

            }{
                return res.redirect('back');
            }
        })
        .catch((err)=>{
            console.log(err);
        })
}