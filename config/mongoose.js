const mongoose=require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/codeial_development');


const db=mongoose.connection;

db.on('error',console.error.bind(console,'error in making connectin with db'));

db.once('open',function(){
    console.log("sucessfully connected to database"); 
})

module.exports=db;