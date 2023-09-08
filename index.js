const express=require('express');
const app=express();
const port=8000; 
const expressLayouts=require('express-ejs-layouts');

app.use(expressLayouts); //using express layouts

//using router
app.use('/',require('./routes/index'))

//using view enjine
app.set('view engine','ejs');
app.set('views','./views');

app.listen(port,function(err){
    if(err){
        console.log(`Error occur : ${err}`);
    }
    console.log(`Server started sucessfully on port : ${port}`);

})