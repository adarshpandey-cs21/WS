
const express=require('express');
const app=express();
const port=8000; 
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose'); //aquiring database
const cookieParser=require('cookie-parser'); //for cookies
//  const sassMiddleware=require('sass-middleware'); //node-sass-middleware not working
const passportGoogle=require('./config/passport-google-oauth2-strategy');


//used for session coookie
const session=require("express-session");
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const passportJwt=require('./config/passport-jwt-strategy');
const MongoStore=require('connect-mongo');
const flash=require('connect-flash');
const customMware=require('./config/middleware');


app.use(express.urlencoded({extended:true})); //reading through post request
app.use(cookieParser()); //cookie middleware

app.use(expressLayouts); //using express layouts
app.use(express.static('./assets')); //setting static file for layout
app.use('/uploads',express.static(__dirname+'/uploads')); //make the uploads path available to browser


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

app.use(flash());
app.use(customMware.setFlash);

//using router
app.use('/',require('./routes'))


app.listen(port,function(err){
    if(err){
        console.log(`Error occur : ${err}`);
    }
    console.log(`Server started sucessfully on port : ${port}`);

})