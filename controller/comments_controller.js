const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsMailer=require('../mailers/comments_mailer');
const commentEmailWorker=require('../workers/comment_email_worker');
const queue=require('../config/kue');


module.exports.create =async function (req, res) {
    try{
        let post=await Post.findById( req.body.post );
            if (post) {
              let comment=await  Comment.create({
                    content: req.body.content,
                    post: req.body.post,
                    user: req.user._id
                })
            
                    post.comments.push(comment);
                    post.save(); // Use 'return' to chain promises
                    // res.redirect('/');
                    comment=await Comment.findById(comment._id).populate('user','name email');
                    // commentsMailer.newComment(comment);
                   let job= queue.create('emails',comment).save().then(()=>{console.log('job enqued',job.id);}).catch((err)=>console.log("error in creating a queue",err));
                    if(req.xhr){
                        return res.status(200).json({
                            data:{
                                comment:comment
                            },
                            message:'comment created'
                        })
                    }
                    req.flash('success','Comment Published');
                    res.redirect('/');

            }

    }catch(err) {
            req.flash('error',err);
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
