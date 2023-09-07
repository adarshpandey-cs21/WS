const express=require('express');
const app=express();
const port=8000;



app.listen(port,function(err){
    if(err){
        console.log(`Error occur : ${err}`);
    }
    console.log(`Server started sucessfully on port : ${port}`);

})