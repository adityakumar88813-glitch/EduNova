

const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");

const OTPSchema = new mongoose.Schema({
   
      email:{
        type:String,
        required:true,

    },
    otp:{
        type:String,
         required:true,
    },
    createdAt:{
          type:Date,
         default:Date.now,
         expires:5*60,
    },
   

});


//to send the email
async function sendVerificationEmail(email,otp) {
    try{
        const mailResponse = await mailSender(email,"Verification Email from StudyNotion",otp);
        console.log("Email sent Succesfully:",mailResponse);

    }catch(error){
        console.log("error occured while sending mails",error);
    
    }
    
}


OTPSchema.pre("save",async function(){
    await sendVerificationEmail(this.email,this.otp);
    
})








module.exports = mongoose.model("OTP",   OTPSchema );