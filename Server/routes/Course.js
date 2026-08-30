const express = require("express");

const router = express.Router();


// ================= CONTROLLERS =================

// Course controllers
const {
  createCourse,
  getAllCourses,
  getCourseDetails,
  getInstructorCourses,
  deleteCourse,
  editCourse,
  getFullCourseDetails,
} = require("../controllers/Course");

// Category controllers
const {
  showAllCategories,
  createCategory,
  categoryPageDetails,
} = require("../controllers/Category");



// Section controllers
const {
  createSection,
  updateSection,
  deleteSection,
} = require("../controllers/Section");

// SubSection controllers
const {
  createSubSection,
  updateSubSection,
  deleteSubSection,
} = require("../controllers/SubSection");

// Rating controllers
const {
  createRating,
  getAverageRating,
  getAllRating,
} = require("../controllers/RatingAndReview");

// Course progress controller
const {
  updateCourseProgress,
} = require("../controllers/courseProgress");

// ================= MIDDLEWARES =================

const {
  auth,
  isInstructor,
  isStudent,
  isAdmin,
} = require("../middlewares/auth");

// =================================================
//                  COURSE ROUTES
// =================================================

// Create Course
router.post(
  "/createCourse",
  auth,
  isInstructor,
  createCourse
);

// Get All Courses
router.get(
  "/getAllCourses",
  getAllCourses
);

router.post(
  "/editCourse",
  auth,
  isInstructor,
  editCourse
);

// Get Course Details
router.post(
  "/getCourseDetails",
  getCourseDetails
);

// Get Full Course Details
router.post(
  "/getFullCourseDetails",
  auth,
  getFullCourseDetails
);

// Get Instructor Courses
router.get(
  "/getInstructorCourses",
  auth,
  isInstructor,
  getInstructorCourses
);

router.delete(
  "/deleteCourse",
  auth,
  isInstructor,
  deleteCourse
);

// =================================================
//                 CATEGORY ROUTES
// =================================================

// Create Category
router.post(
  "/createCategory",
  auth,
  isAdmin,
  createCategory
);

// Show All Categories
router.get(
  "/showAllCategories",
  showAllCategories
);

// Category Page Details
router.post(
  "/categoryPageDetails",
  categoryPageDetails
);

// =================================================
//                  SECTION ROUTES
// =================================================

// Add Section
router.post(
  "/addSection",
  auth,
  isInstructor,
  createSection
);

// Update Section
router.post(
  "/updateSection",
  auth,
  isInstructor,
  updateSection
);

// Delete Section
router.delete(
  "/deleteSection",
  auth,
  isInstructor,
  deleteSection
);

// =================================================
//                SUBSECTION ROUTES
// =================================================

// Add SubSection
router.post(
  "/addSubSection",
  auth,
  isInstructor,
  createSubSection
);

// Update SubSection
router.post(
  "/updateSubSection",
  auth,
  isInstructor,
  updateSubSection
);

// Delete SubSection
router.delete(
  "/deleteSubSection",
  auth,
  isInstructor,
  deleteSubSection
);

// =================================================
//               COURSE PROGRESS ROUTE
// =================================================

router.post(
  "/updateCourseProgress",
  auth,
  isStudent,
  updateCourseProgress
);

// =================================================
//                RATING ROUTES
// =================================================

// Create Rating
router.post(
  "/createRating",
  auth,
  isStudent,
  createRating
);

// Get Average Rating
router.get(
  "/getAverageRating",
  getAverageRating
);

// Get All Reviews
router.get(
  "/getReviews",
  getAllRating
);

// =================================================

module.exports = router;