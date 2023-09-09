module.exports.home=function(req,res){
    // return res.end('<h1> Express is up for Codeial!! </h1>');

    console.log(req.cookies); //for cookies
    res.cookie('adarsh',87);
    //rendering ejs file
    return res.render('home',{
        title:"Home"
    })
}