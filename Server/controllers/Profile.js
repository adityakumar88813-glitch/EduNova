
const Profile = require("../models/Profile");
const User =  require("../models/User");
const Course = require("../models/Course");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

exports.updateprofile = async (req , res)=>{
    try{
        //get data(userId)
        const{ dateOfBirth="", about="" , contactNumber , gender} = req.body;

        //get userId
        const id = req.user.id;

        if(!contactNumber || !gender) {
             return res.status(400).json({
            success:false,
            message:'All field required',
            });
        }

        //find profile
        const userDetails = await User.findById(id);
        const profileId = userDetails.additionalDetails;
        const profileDetails = await Profile.findById(profileId);



        //update profile
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.gender = gender;
        profileDetails.contactNumber = contactNumber;

        //db me save
        await profileDetails.save();

        //return response
         return res.status(200).json({
            success:true,
            message:'Profile updated succesfully',
            profileDetails,
            });


    }catch(error){
         return res.status(500).json({
            success:false,
            message:'All field required',
            error: error.message,
            });

    }
}


//account delete 
exports.deleteAccount = async(req , res)=>{
    try{
        //get id
        const id = req.body.id;

        //vaildation
        const userDetails = await User.findById(id);
        if(!userDetails){
            return res.status(500).json({
            success:false,
            message:'User Not found',
            
            });
            
        }

        //user profile delete
        await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});

        //delete user
        await User.findByIdAndDelete({_id:id});

        //response
         return res.status(400).json({
            success:true,
            message:'Account delete succesfully',
            
            });


    }catch(error){
   return res.status(500).json({
            success:false,
            message:'User not found',
            error: error.message,
            });
    }
}




//get all user details
exports.getAllUserDetails = async(req , res)=>{
    try{
        //get id
        const id = req.user.id;

        //vaildation
        const userDeatils = await User.findById(id).populate("additionaldetails").exec();
          if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

        //return response
        return res.status(200).json({
            success:true,
            message:'User data fetched succesfully',
           
            });


    }catch(error){
        return res.status(500).json({
            success:false,
            message:'User not found',
            error: error.message,
            });
    }
}