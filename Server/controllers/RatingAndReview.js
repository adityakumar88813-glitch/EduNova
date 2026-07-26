
const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");


//create rating
exports.createRating = async(req , res)=>{
    try{
              //get userId
              const userId = req.user.id;

              //fetch data
              const{rating , review , courseId} = req.body;

              //check user is enrollrd or not
              const courseDeatils = await Course.findOne(
                                           {_id:courseId , 
                                            studentsEnrolled: {$elemMatch:{$eq:userId}},
                                           }
                                             );
    if(!courseDeatils){
           return res.status(400).json({
            success:false,
            message:'Students is not enrolled in this course',
            });  
    }


      //check if user already reviewed the course
      const alreadyreviewed = await RatingAndReview.findOne({
                                       user:userId,
                                       course:courseId,
                                        });
         if(alreadyreviewed){
                   return res.status(400).json({
                  success:false,
                  message:'Students already reviewed this course',
            });
         }                               
  //create rating
  const ratingReview = await RatingAndReview.create({
                                  rating,review,
                                  course:courseId,
                                  user:userId,
  });


//update this course with this rating and review
    const updatedCourseDetails =  await Course.findByIdAndUpdate({_id:courseId},
                                {
                                    $push:{
                                            ratingAndReviews:ratingReview._id,
                                    }
                                },
                                {new:true});
  

//return response
 return res.status(200).json({
                  success:true,
                  message:'Rating and Review created succesfully',
            });




    }catch(error){
        console.log(error);
         return res.status(400).json({
                  success:false,
                 message:'error.message',
            });
    }
}


//getAverageRating
exports.getAverageRating = async(req , res)=>{
    try{
        //fetch course
        const courseId = req.body.courseId;

        //cal avg rating
        const result = await RatingAndReview.aggregate([
            {
                $match:{
                    course : new mongoose.Types.ObjectId(courseId),
                },
            },
               {
                $group:{
                    _id:null,
                    averageRating:{$avg : "$rating"},
                }
               }
            
        ])
            
        //return rating
        if(result.length > 0){
              return res.status(200).json({
                  success:true,
                 averageRating:result[0].averageRating,
            });
        }
        //if no rating exist
        return  res.status(200).json({
            success:true,
            message:'No rating given till now ',
            averageRating,
        })

    }catch(error){
        console.log(error);
         return res.status(500).json({
                  success:false,
                  message:'error.message',
            });
    }
}


//get all rating and review
exports.getAllRating = async(req ,res)=>{
    try{
        const allReviews = await RatingAndReview.find({})
                              .sort({rating:"desc"})
                              .populate({
                                path:"user",
                                select:"firstName lastName email image",
                              })
                              .populate({
                                path:"courses",
                                select:"courseName",
                              })
                    
                              .exec();

       return res.status(200).json({
                  success:true,
                  message:"All reviews are fectched succesfully",
                  data:allReviews,
            });
                                  

    }catch(error){
         console.log(error);
         return res.status(500).json({
                  success:false,
                  message:'error.message',
            });
    }

}