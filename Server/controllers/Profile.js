const Course = require("../models/Course");
const CourseProgress = require("../models/CourseProgress");
const Profile = require("../models/Profile");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

const { convertSecondsToDuration } = require("../utils/secToDuration");
const { durationToSeconds } = require("../utils/durationToSec");

// ======================================================
// UPDATE PROFILE
// ======================================================
exports.updateProfile = async (req, res) => {
  try {
    const {
      dateOfBirth = "",
      about = "",
      contactNumber = "",
      gender = "",
    } = req.body;

    const id = req.user.id;

    const userDetails = await User.findById(id);

    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const profile = await Profile.findById(
      userDetails.additionalDetails
    );

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile details not found",
      });
    }

    profile.dateOfBirth = dateOfBirth;
    profile.about = about;
    profile.contactNumber = contactNumber;
    profile.gender = gender;

    await profile.save();

    const updatedUserDetails = await User.findById(id)
      .populate("additionalDetails")
      .exec();

    if (!updatedUserDetails) {
      return res.status(404).json({
        success: false,
        message: "Updated user not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      updatedUserDetails,
    });
  } catch (error) {
    console.log("UPDATE PROFILE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Could not update profile",
      error: error.message,
    });
  }
};

// ======================================================
// DELETE ACCOUNT
// ======================================================
exports.deleteAccount = async (req, res) => {
  try {
    console.log("Printing ID:", req.user.id);

    const id = req.user.id;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    await Profile.findByIdAndDelete({
      _id: user.additionalDetails,
    });

    await User.findByIdAndDelete({
      _id: id,
    });

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.log("DELETE ACCOUNT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "User Cannot be deleted successfully",
    });
  }
};

// ======================================================
// GET ALL USER DETAILS
// ======================================================
exports.getAllUserDetails = async (req, res) => {
  try {
    const id = req.user.id;

    const userDetails = await User.findById(id)
      .populate("additionalDetails")
      .exec();

    console.log(userDetails);

    return res.status(200).json({
      success: true,
      message: "User Data fetched successfully",
      data: userDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================================
// UPDATE DISPLAY PICTURE
// ======================================================
exports.updateDisplayPicture = async (req, res) => {
  try {
    const displayPicture = req.files.displayPicture;
    const userId = req.user.id;

    const image = await uploadImageToCloudinary(
      displayPicture,
      process.env.FOLDER_NAME,
      1000,
      1000
    );

    console.log(image);

    const updatedProfile = await User.findByIdAndUpdate(
      { _id: userId },
      { image: image.secure_url },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Image Updated successfully",
      data: updatedProfile,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================================
// GET ENROLLED COURSES
// ======================================================
exports.getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id;

    let userDetails = await User.findById(userId)
      .populate({
        path: "courses",
        populate: {
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        },
      })
      .exec();

    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    userDetails = userDetails.toObject();

    for (let i = 0; i < userDetails.courses.length; i++) {
      let totalDurationInSeconds = 0;
      let subsectionLength = 0;

      const course = userDetails.courses[i];

      // ============================================
      // CALCULATE TOTAL COURSE DURATION
      // ============================================
      for (let j = 0; j < course.courseContent.length; j++) {
        const section = course.courseContent[j];

        totalDurationInSeconds += section.subSection.reduce(
          (acc, curr) => {
            return acc + durationToSeconds(curr.timeDuration);
          },
          0
        );

        subsectionLength += section.subSection.length;
      }

      course.totalDuration =
        convertSecondsToDuration(totalDurationInSeconds);

      // ============================================
      // COURSE PROGRESS
      // ============================================
      let courseProgressCount = await CourseProgress.findOne({
        courseID: course._id,
        userId: userId,
      });

      courseProgressCount =
        courseProgressCount?.completedVideos?.length || 0;

      // ============================================
      // PROGRESS PERCENTAGE
      // ============================================
      if (subsectionLength === 0) {
        course.progressPercentage = 0;
      } else {
        const multiplier = Math.pow(10, 2);

        course.progressPercentage =
          Math.round(
            (courseProgressCount / subsectionLength) *
              100 *
              multiplier
          ) / multiplier;
      }
    }

    return res.status(200).json({
      success: true,
      data: userDetails.courses,
    });
  } catch (error) {
    console.log("GET ENROLLED COURSES ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================================
// INSTRUCTOR DASHBOARD
// ======================================================
exports.instructorDashboard = async (req, res) => {
  try {
    const courseDetails = await Course.find({
      instructor: req.user.id,
    });

    const courseData = courseDetails.map((course) => {
      const totalStudentsEnrolled =
        course.studentsEnrolled?.length || 0;

      const totalAmountGenerated =
        totalStudentsEnrolled * Number(course.price || 0);

      return {
        _id: course._id,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        totalStudentsEnrolled,
        totalAmountGenerated,
      };
    });

    return res.status(200).json({
      success: true,
      courses: courseData,
    });
  } catch (error) {
    console.error("INSTRUCTOR DASHBOARD ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};