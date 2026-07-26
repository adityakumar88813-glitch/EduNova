
const jwt = require("jsonwebtoken");
const user = require("../models/User");
require("dotenv").config();


//auth
exports.auth = async (req, res , next)=>{
    try{
        //extrcat token
        const token =req.body.token || req.cookies.token || req.header("Authorisation").replace("Bearer","");
        //token missing
        if(!token){
            return res.status(401).json({
            success:false,
            message:'Token is missing',
            });
        }

        //verify Token by secreat
        try{
            const decode =  jwt.verify(token,process.env.JWT_SECRET);
             console.log(decode);
             req.user = decode;
        }catch(error){
             return res.status(401).json({
            success:false,
            message:'Token is invaild',
            });
        }
        next();


    }catch(error){
      return res.status(401).json({
            success:false,
            message:'Something went wrong while vaildating the token',
            });
    }
}

//isstdent

exports.isStudent  = async (req, res, next)=>{
    try{
         if(req.user.accountType !=="Stuent"){
             return res.status(401).json({
            success:false,
            message:'This is procted routes for students ',
            });
         }
         next();

    }catch(error){
         return res.status(401).json({
            success:false,
            message:'User role cannot be verified',
            });
    }
}





//isInstructor

exports.isInstructor = async (req, res, next)=>{
    try{
         if(req.user.accountType !=="Instructor"){
             return res.status(401).json({
            success:false,
            message:'This is procted routes for Instructor ',
            });
         }
         next();

    }catch(error){
         return res.status(401).json({
            success:false,
            message:'User role cannot be verified',
            });
    }
}




//isAdmin
exports.isAdmin = async (req, res, next)=>{
    try{
         if(req.user.accountType !=="Admin"){
             return res.status(401).json({
            success:false,
            message:'This is procted routes for Admin',
            });
         }
         next();

    }catch(error){
         return res.status(401).json({
            success:false,
            message:'User role cannot be verified',
            });
    }
}

