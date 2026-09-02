const Course = require("../models/Course")
const Category = require("../models/Category")
const Section = require("../models/Section")
const SubSection = require("../models/SubSection")
const User = require("../models/User")
const CourseProgress = require("../models/CourseProgress")

const { uploadImageToCloudinary } = require("../utils/imageUploader")
const { convertSecondsToDuration } = require("../utils/secToDuration")


// ============================================================
// HELPER: Convert duration to seconds
// ============================================================

function convertDurationToSeconds(duration) {
  if (!duration) return 0

  const value = String(duration).trim()

  // -----------------------------------------
  // Format: "00:25"
  // Format: "05:30"
  // -----------------------------------------
  if (value.includes(":")) {
    const parts = value.split(":")

    // MM:SS
    if (parts.length === 2) {
      const minutes = parseInt(parts[0], 10) || 0
      const seconds = parseInt(parts[1], 10) || 0

      return minutes * 60 + seconds
    }

    // HH:MM:SS
    if (parts.length === 3) {
      const hours = parseInt(parts[0], 10) || 0
      const minutes = parseInt(parts[1], 10) || 0
      const seconds = parseInt(parts[2], 10) || 0

      return hours * 3600 + minutes * 60 + seconds
    }
  }

  // -----------------------------------------
  // Old data stored directly as seconds
  // Example: "25"
  // -----------------------------------------
  return parseInt(value, 10) || 0
}


// ============================================================
// CREATE COURSE
// ============================================================

exports.createCourse = async (req, res) => {
  try {
    const userId = req.user.id

    let {
      courseName,
      courseDescription,
      whatYouWillLearn,
      price,
      tag: _tag,
      category,
      status,
      instructions: _instructions,
    } = req.body

    const thumbnail = req.files?.thumbnailImage

    // Parse arrays
    const tag = JSON.parse(_tag)
    const instructions = JSON.parse(_instructions)

    // Validation
    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      !tag.length ||
      !thumbnail ||
      !category ||
      !instructions.length
    ) {
      return res.status(400).json({
        success: false,
        message: "All Fields are Mandatory",
      })
    }

    if (!status) {
      status = "Draft"
    }

    // Check instructor
    const instructorDetails = await User.findOne({
      _id: userId,
      accountType: "Instructor",
    })

    if (!instructorDetails) {
      return res.status(404).json({
        success: false,
        message: "Instructor Details Not Found",
      })
    }

    // Check category
    const categoryDetails = await Category.findById(category)

    if (!categoryDetails) {
      return res.status(404).json({
        success: false,
        message: "Category Details Not Found",
      })
    }

    // Upload thumbnail
    const thumbnailImage = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    )

    // Create course
    const newCourse = await Course.create({
      courseName,
      courseDescription,
      instructor: instructorDetails._id,
      whatYouWillLearn,
      price,
      tag,
      category: categoryDetails._id,
      thumbnail: thumbnailImage.secure_url,
      status,
      instructions,
    })

    // Add course to instructor
    await User.findByIdAndUpdate(
      instructorDetails._id,
      {
        $push: {
          courses: newCourse._id,
        },
      },
      {
        new: true,
      }
    )

    // Add course to category
    await Category.findByIdAndUpdate(
      category,
      {
        $push: {
          course: newCourse._id,
        },
      },
      {
        new: true,
      }
    )

    return res.status(200).json({
      success: true,
      data: newCourse,
      message: "Course Created Successfully",
    })
  } catch (error) {
    console.error("CREATE COURSE ERROR:", error)

    return res.status(500).json({
      success: false,
      message: "Failed to create course",
      error: error.message,
    })
  }
}


// ============================================================
// EDIT COURSE
// ============================================================

exports.editCourse = async (req, res) => {
  try {
    const { courseId } = req.body

    const updates = { ...req.body }

    delete updates.courseId

    const course = await Course.findById(courseId)

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      })
    }

    // -----------------------------------------
    // Update thumbnail
    // -----------------------------------------

    if (req.files?.thumbnailImage) {
      const thumbnail = req.files.thumbnailImage

      const thumbnailImage = await uploadImageToCloudinary(
        thumbnail,
        process.env.FOLDER_NAME
      )

      course.thumbnail = thumbnailImage.secure_url
    }

    // -----------------------------------------
    // Update fields
    // -----------------------------------------

    for (const key in updates) {
      if (
        Object.prototype.hasOwnProperty.call(updates, key)
      ) {
        if (key === "tag" || key === "instructions") {
          course[key] = JSON.parse(updates[key])
        } else {
          course[key] = updates[key]
        }
      }
    }

    await course.save()

    // -----------------------------------------
    // Get updated course
    // -----------------------------------------

    const updatedCourse = await Course.findById(courseId)
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate({
        path: "ratingAndReviews",
        populate: {
          path: "user",
          select: "firstName lastName image",
        },
      })
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
          select: "-videoUrl",
        },
      })
      .exec()

    return res.status(200).json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    })
  } catch (error) {
    console.error("EDIT COURSE ERROR:", error)

    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    })
  }
}


// ============================================================
// GET ALL COURSES
// ============================================================

// Get Course List
exports.getAllCourses = async (req, res) => {
  try {
    const allCourses = await Course.find(
      { status: "Published" },
      {
        courseName: true,
        price: true,
        thumbnail: true,
        instructor: true,
        ratingAndReviews: true,
        studentsEnrolled: true,
      }
    )
      .populate("instructor")
      .populate("ratingAndReviews")
      .exec()

    return res.status(200).json({
      success: true,
      data: allCourses,
    })
  } catch (error) {
    console.log("GET ALL COURSES ERROR:", error)

    return res.status(500).json({
      success: false,
      message: "Can't Fetch Course Data",
      error: error.message,
    })
  }
}
// ============================================================
// GET COURSE DETAILS
// ============================================================

exports.getCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body

    const courseDetails = await Course.findOne({
      _id: courseId,
    })
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
          select: "-videoUrl",
        },
      })
      .exec()

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find course with id: ${courseId}`,
      })
    }

    // -----------------------------------------
    // Calculate total duration
    // -----------------------------------------

    let totalDurationInSeconds = 0

    courseDetails.courseContent?.forEach((content) => {
      content.subSection?.forEach((subSection) => {
        totalDurationInSeconds += convertDurationToSeconds(
          subSection.timeDuration
        )
      })
    })

    const totalDuration =
      convertSecondsToDuration(totalDurationInSeconds)

    return res.status(200).json({
      success: true,
      data: {
        courseDetails,
        totalDuration,
      },
    })
  } catch (error) {
    console.error("GET COURSE DETAILS ERROR:", error)

    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}


// ============================================================
// GET FULL COURSE DETAILS
// ============================================================

exports.getFullCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body

    const userId = req.user.id

    const courseDetails = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate({
        path: "ratingAndReviews",
        populate: {
          path: "user",
          select: "firstName lastName image",
        },
      })
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec()

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find course with id: ${courseId}`,
      })
    }

    // -----------------------------------------
    // Course progress
    // -----------------------------------------

    const courseProgressCount =
      await CourseProgress.findOne({
        courseID: courseId,
        userId: userId,
      })

    // -----------------------------------------
    // Calculate total duration
    // -----------------------------------------

    let totalDurationInSeconds = 0

    courseDetails.courseContent?.forEach((content) => {
      content.subSection?.forEach((subSection) => {
        totalDurationInSeconds += convertDurationToSeconds(
          subSection.timeDuration
        )
      })
    })

    const totalDuration =
      convertSecondsToDuration(totalDurationInSeconds)

    return res.status(200).json({
      success: true,
      data: {
        courseDetails,
        totalDuration,
        completedVideos:
          courseProgressCount?.completedVideos || [],
      },
    })
  } catch (error) {
    console.log(
      "🔥 GET FULL COURSE DETAILS ERROR:",
      error
    )

    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}


// ============================================================
// GET INSTRUCTOR COURSES
// ============================================================

exports.getInstructorCourses = async (req, res) => {
  try {
    const instructorId = req.user.id

    // -----------------------------------------
    // IMPORTANT:
    // Populate courseContent and subSection
    // -----------------------------------------

    const instructorCourses = await Course.find({
      instructor: instructorId,
    })
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .sort({
        createdAt: -1,
      })
      .exec()

    // -----------------------------------------
    // Calculate duration for every course
    // -----------------------------------------

    const coursesWithDuration =
      instructorCourses.map((course) => {
        let totalDurationInSeconds = 0

        course.courseContent?.forEach((section) => {
          section.subSection?.forEach((subSection) => {
            totalDurationInSeconds +=
              convertDurationToSeconds(
                subSection.timeDuration
              )
          })
        })

        const courseObject = course.toObject()

        courseObject.totalDuration =
          convertSecondsToDuration(
            totalDurationInSeconds
          )

        return courseObject
      })

    return res.status(200).json({
      success: true,
      data: coursesWithDuration,
    })
  } catch (error) {
    console.error(
      "GET INSTRUCTOR COURSES ERROR:",
      error
    )

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve instructor courses",
      error: error.message,
    })
  }
}


// ============================================================
// DELETE COURSE
// ============================================================

exports.deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.body

    // Find course
    const course = await Course.findById(courseId)

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      })
    }

    // -----------------------------------------
    // Unenroll students
    // -----------------------------------------

    const studentsEnrolled =
      course.studentsEnrolled || []

    for (const studentId of studentsEnrolled) {
      await User.findByIdAndUpdate(
        studentId,
        {
          $pull: {
            courses: courseId,
          },
        }
      )
    }

    // -----------------------------------------
    // Delete sections + subsections
    // -----------------------------------------

    const courseSections =
      course.courseContent || []

    for (const sectionId of courseSections) {
      const section =
        await Section.findById(sectionId)

      if (section) {
        const subSections =
          section.subSection || []

        for (const subSectionId of subSections) {
          await SubSection.findByIdAndDelete(
            subSectionId
          )
        }
      }

      await Section.findByIdAndDelete(
        sectionId
      )
    }

    // -----------------------------------------
    // Delete course
    // -----------------------------------------

    await Course.findByIdAndDelete(courseId)

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    })
  } catch (error) {
    console.error(
      "DELETE COURSE ERROR:",
      error
    )

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
}