const Post=require('../../../models/post');
const Comment=require('../../../models/comment');

module.exports.index=async function(req,res){

    let posts=await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    });

   return res.json(200,{
    message:"List of Posts",
    posts:posts
   })
}



module.exports.destroy = async function (req, res) {
    try {
        // Find the post by its ID
        const post = await Post.findOne({ _id: req.params.id });
        if (post.user.toString() === req.user.id.toString()) {

        if (!post) {
            // Handle the case where no post with the given ID is found
            return res.redirect('back');
        }

            await Post.deleteOne({ _id: post._id });

            // Remove associated comments
            await Comment.deleteMany({ post: req.params.id });
            
            return res.json(200,{
                message:"Post and associated comments deleted succesfully"
            })
        }else{
            return res.json(401,{
                message:"you cannot delete this post"
            })
        }
       
    } catch (err) {
        console.log("*********",err);
        // req.flash('error',err);
        return res.json(500,{
            
            message:"Server Error"
        });
    }
};
