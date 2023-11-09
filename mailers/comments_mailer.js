const nodemailer=require('../config/nodemailer');

//this is another way of exporting module
exports.newComment=(comment)=>{
    let htmlString=nodemailer.renderTemplate({comment:comment},'/comments/new_comment.ejs');

    nodemailer.transporter.sendMail({
        from:'codeial05@gmail.com',
        to:comment.user.email,
        subject:'New Comment Published',
        html:htmlString
    },(err,info)=>{
        if(err){
            console.log("error in sending mail",err);
            return;
        }
        console.log("mail delivered",info);
        return;
    })
}