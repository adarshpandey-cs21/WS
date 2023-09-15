const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function (req, res) {
    Post.findOne({ _id: req.body.post })
        .then((post) => {
            if (post) {
                Comment.create({
                    content: req.body.content,
                    post: req.body.post,
                    user: req.user._id
                })
                .then((comment) => {
                    post.comments.push(comment);
                    return post.save(); // Use 'return' to chain promises
                })
                .then(() => {
                    res.redirect('/');
                })
                .catch((err) => {
                    console.error(err);
                    res.status(500).send('Internal Server Error');
                });
            } else {
                res.status(404).send('Post not found');
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Internal Server Error');
        });
};
