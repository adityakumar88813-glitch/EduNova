

const User = require("../models/User");
// const user = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt")
const crypto = require("crypto");


//resetPasswordToken
exports.resetPasswordtoken= async(req,res)=>{
   
try{
    //get email
const email =req.body.email;

//check email for user
const user = await User.findOne({email:email});
if(!user){
     return res.status(401).json({
            success:false,
            message:'Email is not registerd',
            });
}

//token generate
const token = crypto.randomUUID();


//update user by adding token and expires date
const updatedDetails = await User.findOneAndUpdate(
   {email:email},
   {
    token:token,
    resetPasswordExpires:Date.now()+5*60*1000,
   },{new:true});

//generate URL
    const url = `http://localhost:3000/update-password/${token}`

    //send mail
    await mailSender(email,"Password Reset Link",`Password Reset Link:${url}`);

    //response
     return res.json({
            success:true,
            message:'Email sent Succesfully , please Check Eamil and change Password',
            });


}
catch(error){
  console.log(error);
    return res.status(500).json({
            success:false,
            message:'Something went wrong',
            });
}
}


///reset password
exports.resetPassword = async(req,res)=>{
   
    try{
         ///data fetch
        const{password,confirmPassword,token} = req.body;

          //vaildation
        if(password !== confirmPassword){
        return res.status(401).json({
            success:false,
            message:'Password and ComfirmPassword are not matching',
            });
    }


//get userdaetils by token
const userDetails = await User.findOne({token:token});

//if no entry means inavild token

if(!userDetails){
    return res.status(401).json({
            success:false,
            message:'Invalid Token',
            });
}

//time check of token
if(userDetails.resetPasswordExpires < Date.now()){
  return res.status(403).json({
            success:false,
            message:'Token is expires ,please regenerate your token',
            });

}

//password hash
const hashedPassword =  await bcrypt.hash(password,10);

//passwordupdate
await User.findOneAndUpdate(
    {token:token},
    {password:hashedPassword},
    {new:true},
);

//return reponse
 return res.status(200).json({
            success:true,
            message:'Password succesfully updated'
            });
        

    }catch(error){
              return res.status(401).json({
            success:false,
            message:'Something went worng ',
            });
    }
}