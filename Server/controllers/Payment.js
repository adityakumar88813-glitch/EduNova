const{instance} = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const{courseEnrollmentEmil} = require("../mail/courseEnrollmentEmail");
const { default: mongoose } = require("mongoose");

//capture the payment and intiate the razorpay order
exports.capturePayment = async(req , res)=>{
    //get courseId and userId
    const{course_id} = req.body;
    const userId = req.user.id;


   // vaildation
   //valid couserId
   if(!course_id){
     return res.status(401).json({
            success:false,
            message:'Please provide valid course Id ',
            });
   };

   //valid courseDeatils
   let course;
   try{
    course = await Course.findById(course_id);
    if(!course){
         return res.status(404).json({
            success:false,
            message:'Could not find the course',
            });
    }

    //user already pay for this course
    const uid = new mongoose.Types.ObjectId(userId);
    if(course.studentsEnrolled.includes(uid)){
         return res.status(200).json({
            success:false,
            message:'student is already enrolled ',
            });
    }

   }catch(error){
           console.error(error);
            return res.status(500).json({
            success:false,
            message:'error.message ',
            });
   }
}


//order create
exports.verifySignature = async (req, res) => {
    const webhookSecret = "12345678";

    const signature = req.headers["x-razorpay-signature"];

    const shasum = crypto.createHmac("sha256", webhookSecret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    if (digest === signature) {
        console.log("Valid webhook");

        const { courseId, userId } = req.body.payload.entity.notes;

        try {
            const enrolledCourse = await Course.findByIdAndUpdate(
                courseId,
                { $push: { studentsEnrolled: userId } },
                { new: true }
            );

            if (!enrolledCourse) {
                return res.status(404).json({
                    success: false,
                    message: "Course not found",
                });
            }

            const enrolledStudents = await User.findByIdAndUpdate(
                userId,
                { $push: { courses: courseId } },
                { new: true }
            );

            await mailSender(
                enrolledStudents.email,
                "Congratulations from StudyNotion",
                "You are enrolled in a new course"
            );

            return res.status(200).json({
                success: true,
                message: "Signature verified & course added",
            });

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }

    } else {
        return res.status(400).json({
            success: false,
            message: "Invalid request",
        });
    }
};