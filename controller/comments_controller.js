const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create =async function (req, res) {
    try{
        let post=await Post.findOne({ _id: req.body.post })
            if (post) {
              let comment=await  Comment.create({
                    content: req.body.content,
                    post: req.body.post,
                    user: req.user._id
                })
            
                    post.comments.push(comment);
                    post.save(); // Use 'return' to chain promises
                    res.redirect('/');
            } else {
                res.status(404).send('Post not found');
            }
    }
    catch(err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
    }
};





module.exports.destroy = async function (req, res) {
    try {
        // Find the comment by its ID
        const comment = await Comment.findOne({ _id: req.params.id });

        if (!comment) {
            // Handle the case where no comment with the given ID is found
            return res.redirect('back');
        }

        // Check if the user owns the comment (compare as strings)
        if (comment .user.toString() === req.user.id.toString()) {
            let postId=comment.post;
            // Remove the comment
            await Comment.deleteOne({ _id: comment._id });

            // Remove  update post
            Post.findByIdAndUpdate(postId,{ $pull:{comments:req.params.id}});
            return res.redirect('back');
            
        } else {
            // If the user doesn't own the comment, redirect back
            return res.redirect('back');
        }
    } catch (err) {
        console.error(err);
        return res.redirect('back');
    }
};
