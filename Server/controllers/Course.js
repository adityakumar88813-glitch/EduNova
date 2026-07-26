const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const { uploadImageCloudinary } = require("../utils/imageUploader");


// ================= CREATE COURSE =================
exports.createCourse = async (req, res) => {
  try {
    // fetch data
    const {
      courseName,
      courseDescription,
      whatYouWillLearn,
      price,
      category, 
    } = req.body;

    const thumbnail = req.files?.thumbnailImage;

    // validation
    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      !category ||
      !thumbnail
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // instructor check
    const userId = req.user.id;
    const instructorDetails = await User.findById(userId);

    if (!instructorDetails) {
      return res.status(404).json({
        success: false,
        message: "Instructor not found",
      });
    }

    // category check
    const categoryDetails = await Category.findById(category);
    if (!categoryDetails) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // upload thumbnail
    const uploadedThumbnail = await uploadImageCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );

    // create course
    const newCourse = await Course.create({
      courseName,
      courseDescription,
      instructor: instructorDetails._id,
      whatYouWillLearn,
      price,
      category: categoryDetails._id,
      thumbnail: uploadedThumbnail.secure_url,
    });

    // add course to instructor
    await User.findByIdAndUpdate(
      instructorDetails._id,
      {
        $push: { courses: newCourse._id },
      },
      { new: true }
    );

    // add course to category
    await Category.findByIdAndUpdate(
      categoryDetails._id,
      {
        $push: { courses: newCourse._id },
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Course created successfully",
      data: newCourse,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to create course",
      error: error.message,
    });
  }
};


// ================= UPDATE COURSE =================
exports.updateCourse = async (req, res) => {
  try {
    const { courseId } = req.body;

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // only instructor can update
    if (course.instructor.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // update fields dynamically
    const updates = req.body;

    Object.keys(updates).forEach((key) => {
      if (key !== "courseId") {
        course[key] = updates[key];
      }
    });

    // update thumbnail (optional)
    if (req.files && req.files.thumbnailImage) {
      const uploadedThumbnail = await uploadImageCloudinary(
        req.files.thumbnailImage,
        process.env.FOLDER_NAME
      );
      course.thumbnail = uploadedThumbnail.secure_url;
    }

    await course.save();

    return res.status(200).json({
      success: true,
      message: "Course updated successfully",
      data: course,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error while updating course",
      error: error.message,
    });
  }
};


// ================= GET ALL COURSES =================
exports.showAllcourses = async (req, res) => {
  try {
    const allCourses = await Course.find({},{
      courseName: true,
      price: true,
      thumbnail: true,
      instructor: true,
      ratingAndReviews: true,
      studentsEnrolled: true,
    })
      .populate("instructor")
      .exec();

    return res.status(200).json({
      success: true,
      message: "All courses fetched successfully",
      data: allCourses,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Cannot fetch courses",
      error: error.message,
    });
  }
};


// ================= GET COURSE DETAILS =================
exports.getCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body;

    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "Course ID is required",
      });
    }

    const courseDetails = await Course.findById(courseId)
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      });

    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: courseDetails,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error fetching course details",
    });
  }
};