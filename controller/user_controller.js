module.exports.profile=function(req,res){
    // return res.end('<h1>user profile click to follow lol</h1>')

    return res.render('usersProfile',{
        title:"usersProfile!"
    })
}