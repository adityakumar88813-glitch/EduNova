const { instance } = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const {
    courseEnrollmentEmail,
} = require("../mail/courseEnrollmentEmail");
const mongoose = require("mongoose");
const crypto = require("crypto");


// ================= CAPTURE PAYMENT =================

exports.capturePayment = async (req, res) => {
    try {
        const { courses } = req.body;
        const userId = req.user.id;

        // Validation
        if (!courses || courses.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Please provide Course Id",
            });
        }

        // Calculate total amount
        let totalAmount = 0;

        for (const courseId of courses) {
            const course = await Course.findById(courseId);

            if (!course) {
                return res.status(404).json({
                    success: false,
                    message: "Could not find the course",
                });
            }

            // Check if user is already enrolled
            const userObjectId = new mongoose.Types.ObjectId(userId);

            const alreadyEnrolled =
                course.studentsEnrolled.includes(userObjectId);

            if (alreadyEnrolled) {
                return res.status(400).json({
                    success: false,
                    message: "Student is already enrolled.",
                });
            }

            totalAmount += course.price;
        }

        // Razorpay options
        const options = {
            amount: totalAmount * 100,
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
        };

        // Create Razorpay order
        const paymentResponse =
            await instance.orders.create(options);

        return res.status(200).json({
            success: true,
            message: paymentResponse,
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Could not initiate Order",
        });
    }
};


// ================= VERIFY PAYMENT =================

exports.verifyPayment = async (req, res) => {
    try {
        const razorpay_order_id =
            req.body?.razorpay_order_id;

        const razorpay_payment_id =
            req.body?.razorpay_payment_id;

        const razorpay_signature =
            req.body?.razorpay_signature;

        const courses = req.body?.courses;

        const userId = req.user.id;

        // Validation
        if (
            !razorpay_order_id ||
            !razorpay_payment_id ||
            !razorpay_signature ||
            !courses ||
            !userId
        ) {
            return res.status(400).json({
                success: false,
                message: "Payment Failed",
            });
        }

        // Create body
        const body =
            razorpay_order_id +
            "|" +
            razorpay_payment_id;

        // Generate expected signature
        const expectedSignature =
            crypto
                .createHmac(
                    "sha256",
                    process.env.RAZORPAY_SECRET
                )
                .update(body.toString())
                .digest("hex");

        // Compare signature
        if (expectedSignature === razorpay_signature) {

            // Enroll student
            await enrollStudent(
                courses,
                userId
            );

            return res.status(200).json({
                success: true,
                message: "Payment Verified",
            });
        }

        return res.status(400).json({
            success: false,
            message: "Payment Failed",
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// ================= ENROLL STUDENT =================

const enrollStudent = async (courses, userId) => {

    if (!courses || !userId) {
        throw new Error(
            "Please provide data for Courses or UserId"
        );
    }

    try {

        // Loop through all courses
        for (const courseId of courses) {

            // Add student to course
            const enrolledCourse =
                await Course.findByIdAndUpdate(
                    courseId,
                    {
                        $push: {
                            studentsEnrolled: userId,
                        },
                    },
                    {
                        new: true,
                    }
                );

            if (!enrolledCourse) {
                throw new Error("Course not found");
            }

            // Add course to user
            const enrolledStudent =
                await User.findByIdAndUpdate(
                    userId,
                    {
                        $push: {
                            courses: courseId,
                        },
                    },
                    {
                        new: true,
                    }
                );

            if (!enrolledStudent) {
                throw new Error("Student not found");
            }

            // Send email
            const emailResponse =
                await mailSender(
                    enrolledStudent.email,

                    `Successfully Enrolled into ${enrolledCourse.courseName}`,

                    courseEnrollmentEmail(
                        enrolledCourse.courseName,
                        enrolledStudent.firstName
                    )
                );

            console.log(
                "Email sent successfully",
                emailResponse.response
            );
        }

    } catch (error) {
        console.log(error);
        throw error;
    }
};


























// //capture the payment and intiate the razorpay order
// exports.capturePayment = async(req , res)=>{
//     //get courseId and userId
//     const{course_id} = req.body;
//     const userId = req.user.id;


//    // vaildation
//    //valid couserId
//    if(!course_id){
//      return res.status(401).json({
//             success:false,
//             message:'Please provide valid course Id ',
//             });
//    };

//    //valid courseDeatils
//    let course;
//    try{
//     course = await Course.findById(course_id);
//     if(!course){
//          return res.status(404).json({
//             success:false,
//             message:'Could not find the course',
//             });
//     }

//     //user already pay for this course
//     const uid = new mongoose.Types.ObjectId(userId);
//     if(course.studentsEnrolled.includes(uid)){
//          return res.status(200).json({
//             success:false,
//             message:'student is already enrolled ',
//             });
//     }

//    }catch(error){
//            console.error(error);
//             return res.status(500).json({
//             success:false,
//             message:'error.message ',
//             });
//    }
// }


// //order create
// exports.verifySignature = async (req, res) => {
//     const webhookSecret = "12345678";

//     const signature = req.headers["x-razorpay-signature"];

//     const shasum = crypto.createHmac("sha256", webhookSecret);
//     shasum.update(JSON.stringify(req.body));
//     const digest = shasum.digest("hex");

//     if (digest === signature) {
//         console.log("Valid webhook");

//         const { courseId, userId } = req.body.payload.entity.notes;

//         try {
//             const enrolledCourse = await Course.findByIdAndUpdate(
//                 courseId,
//                 { $push: { studentsEnrolled: userId } },
//                 { new: true }
//             );

//             if (!enrolledCourse) {
//                 return res.status(404).json({
//                     success: false,
//                     message: "Course not found",
//                 });
//             }

//             const enrolledStudents = await User.findByIdAndUpdate(
//                 userId,
//                 { $push: { courses: courseId } },
//                 { new: true }
//             );

//             await mailSender(
//                 enrolledStudents.email,
//                 "Congratulations from StudyNotion",
//                 "You are enrolled in a new course"
//             );

//             return res.status(200).json({
//                 success: true,
//                 message: "Signature verified & course added",
//             });

//         } catch (error) {
//             return res.status(500).json({
//                 success: false,
//                 message: error.message,
//             });
//         }

//     } else {
//         return res.status(400).json({
//             success: false,
//             message: "Invalid request",
//         });
//     }
// };