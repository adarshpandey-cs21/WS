const express=require('express');
const app=express();
const port=8000; 
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose'); //aquiring database
const cookieParser=require('cookie-parser'); //for cookies
// const sassMiddleware=require('node-sass'); //node-sass-middleware not working

//used for session coookie
const session=require("express-session");
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const MongoStore=require('connect-mongo');

// app.use(sassMiddleware({
//     src:'./assets/scss',
//     dest:'./assets/css',
//     debug:true,
//     outputStyle:'extended',
//     prefix:'/css'
// }));
app.use(express.urlencoded({extended:true})); //reading through post request
app.use(cookieParser()); //cookie middleware

app.use(expressLayouts); //using express layouts
app.use(express.static('./assets')); //setting static file for layout


//extract style and scripts from sub pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);




//using view enjine
app.set('view engine','ejs');
app.set('views','./views');


//mongo store is used to store the session cookie in the db
app.use(session({
     name:'Codeial',
     //to do change the secret before deployment in production model
     secret:'sessionKey',
     saveUninitialized:false,
     resave:false,
     cookie:{
        maxAge:(1000*60*100)
     }, 
     store: MongoStore.create({
        mongoUrl: 'mongodb://127.0.0.1:27017/codeial_development',
            autoRemove:'disabled'
        },
        function(err) {
            console.log(err || 'connect mongo setup ok');
        }

    )

}))

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

//using router
app.use('/',require('./routes'))


app.listen(port,function(err){
    if(err){
        console.log(`Error occur : ${err}`);
    }
    console.log(`Server started sucessfully on port : ${port}`);

})