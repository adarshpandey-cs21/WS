const Post=require('../models/post');
const Comment=require('../models/comment');
module.exports.create=async function(req,res){
    try{
    let post=await Post.create({
            content:req.body.content,
            user:req.user._id
        })
        if(req.xhr){
            return res.status(200).json({
                data:{
                    post:post
                },
                message:"Post Created!"
            });
        }
        req.flash('success','Post Published!');
        return res.redirect('back');
    }catch(err){
        req.flash('error',err);
        // console.log(err);
        return res.redirect('back');
    }
}


module.exports.destroy = async function (req, res) {
    try {
        // Find the post by its ID
        const post = await Post.findOne({ _id: req.params.id });

        if (!post) {
            // Handle the case where no post with the given ID is found
            return res.redirect('back');
        }

        // Check if the user owns the post (compare as strings)
        if (post.user.toString() === req.user.id.toString()) {
            // Remove the post
            await Post.deleteOne({ _id: post._id });

            // Remove associated comments
            await Comment.deleteMany({ post: req.params.id });
            req.flash('success','Post and associated comments Deleted!');
            if(req.xhr){
                return res.status(200).json({
                    data:{
                        post_id:req.params.id
                    },
                    message:"post deleted"
                })
            }
            return res.redirect('back');
        } else {
            // If the user doesn't own the post, redirect back
            return res.redirect('back');
        }
    } catch (err) {
        // console.error(err);
        req.flash('error',err);
        return res.redirect('back');
    }
};
