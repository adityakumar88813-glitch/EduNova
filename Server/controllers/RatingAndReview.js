const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");
const mongoose = require("mongoose");

// ======================================================
// CREATE RATING
// ======================================================
exports.createRating = async (req, res) => {
  try {
    const userId = req.user.id;

    const { rating, review, courseId } = req.body;

    // Check required fields
    if (!rating || !review || !courseId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check whether student is enrolled
    const courseDetails = await Course.findOne({
      _id: courseId,
      studentsEnrolled: {
        $elemMatch: {
          $eq: userId,
        },
      },
    });

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: "Student is not enrolled in this course",
      });
    }

    // Check if user already reviewed
    const alreadyReviewed = await RatingAndReview.findOne({
      user: userId,
      course: courseId,
    });

    if (alreadyReviewed) {
      return res.status(400).json({
        success: false,
        message: "Student has already reviewed this course",
      });
    }

    // Create rating
    const ratingReview = await RatingAndReview.create({
      rating,
      review,
      course: courseId,
      user: userId,
    });

    // Add rating to course
    await Course.findByIdAndUpdate(
      courseId,
      {
        $push: {
          ratingAndReviews: ratingReview._id,
        },
      },
      {
        new: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Rating and Review created successfully",
    });
  } catch (error) {
    console.log("CREATE RATING ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================================
// GET AVERAGE RATING
// ======================================================
exports.getAverageRating = async (req, res) => {
  try {
    const { courseId } = req.query;

    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "Course ID is required",
      });
    }

    const result = await RatingAndReview.aggregate([
      {
        $match: {
          course: new mongoose.Types.ObjectId(courseId),
        },
      },
      {
        $group: {
          _id: null,
          averageRating: {
            $avg: "$rating",
          },
        },
      },
    ]);

    if (result.length > 0) {
      return res.status(200).json({
        success: true,
        averageRating: Number(result[0].averageRating.toFixed(1)),
      });
    }

    return res.status(200).json({
      success: true,
      averageRating: 0,
      message: "No rating given till now",
    });
  } catch (error) {
    console.log("GET AVERAGE RATING ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================================
// GET ALL RATINGS AND REVIEWS
// ======================================================
exports.getAllRating = async (req, res) => {
  try {
    const allReviews = await RatingAndReview.find({})
      .sort({ rating: "desc" })
      .populate({
        path: "user",
        select: "firstName lastName email image",
      })
      .populate({
        path: "course",
        select: "courseName",
      })
      .exec();

    return res.status(200).json({
      success: true,
      message: "All reviews fetched successfully",
      data: allReviews,
    });
  } catch (error) {
    console.log("GET ALL RATING ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};