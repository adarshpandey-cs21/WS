const Post=require('../models/post');
const Comment=require('../models/comment');
module.exports.create=async function(req,res){
    try{
       await Post.create({
            content:req.body.content,
            user:req.user._id
        })
        return res.redirect('back');
    }catch(err){
        console.log(err);
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

            return res.redirect('back');
        } else {
            // If the user doesn't own the post, redirect back
            return res.redirect('back');
        }
    } catch (err) {
        console.error(err);
        return res.redirect('back');
    }
};
