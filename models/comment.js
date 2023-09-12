const { default: mongoose } = require('mongoose');
const mogoose=require('mongoose');

const commentSchema=new mogoose.Schema({
    content:{
        type:String,
        required:true
    },
    //coment belong to user
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'
    }
},{
    timestamps:true 
})

const comment=mongoose.model('Comment',commentSchema);
module.exports=comment;