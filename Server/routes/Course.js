const express = require("express");
const router = express.Router();

// controllers import
const {
  createCourse ,
  getAllCourses,
  getCourseDetails,
} = require("../controllers/Course");

// category controllers
const {
  showAllCategories,
createCategory,
  categoryPageDetails,
} = require("../controllers/Category");

// section controllers
const {
  createSection,
  updateSection,
  deleteSection,
} = require("../controllers/Section");

// subsection controllers
const {
 createSubSection,
updateSubSection,
  deleteSubSection,
} = require("../controllers/SubSection");

// rating controllers
const {
  createRating,
  getAverageRating,
  getAllRating,
} = require("../controllers/RatingAndReview");

//course progress
const {
  updateCourseProgress
} = require("../controllers/courseProgress");


// middlewares
const { auth, isInstructor, isStudent, isAdmin } = require("../middlewares/auth");


//COURSE ROUTES 
router.post("/createCourse", auth, isInstructor, createCourse );
router.get("/getAllCourses", getAllCourses);
router.get("/getCourseDetails", getCourseDetails);


// CATEGORY ROUTES
router.post("/createCategory", auth, isAdmin, createCategory);
router.get("/showAllCategories", showAllCategories);
router.post("/categoryPageDetails", categoryPageDetails);


//SECTION ROUTES 
router.post("/addSection", auth, isInstructor, createSection);
router.post("/updateSection", auth, isInstructor,updateSubSection );
router.delete("/deleteSection", auth, isInstructor, deleteSection);
router.post("/updateCourseProgress" , auth , isStudent, updateCourseProgress);


//  SUBSECTION ROUTES 
router.post("/addSubSection", auth, isInstructor, createSubSection);
router.post("/updateSubSection", auth, isInstructor, updateSubSection);
router.delete("/deleteSubSection", auth, isInstructor, deleteSubSection);


//  RATING ROUTES 
router.post("/createRating", auth, isStudent, createRating);
router.get("/getAverageRating", getAverageRating);
router.get("/getReviews", getAllRating);


module.exports = router;