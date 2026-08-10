
const express = require("express");
const router = express.Router();

// controllers import
const {
  signUp,
  login,
  sendOtp,
} = require("../controllers/Auth");

const {
  resetPasswordtoken,
  resetPassword,
} = require("../controllers/ResetPassword");

const {
  getAllUserDetails,
  updateprofile,
  deleteAccount,
} = require("../controllers/Profile");

// middlewares
const { auth } = require("../middlewares/auth");


// ========== AUTH ROUTES ==========
router.post("/signup", signUp);
router.post("/login", login);
router.post("/sendotp", sendOtp);


// ========== PASSWORD RESET ==========
router.post("/reset-password-token", resetPasswordtoken);
router.post("/reset-password", resetPassword);


// ========== PROFILE ROUTES ==========
router.get("/getUserDetails", auth, getAllUserDetails);
router.put("/updateProfile", auth, updateprofile);
router.delete("/deleteProfile", auth, deleteAccount);


module.exports = router;// Import the required modules
const express = require("express")
const router = express.Router()

// Import the required controllers and middleware functions
const {
  login,
  signup,
  sendotp,
  changePassword,
} = require("../controllers/Auth")
const {
  resetPasswordToken,
  resetPassword,
} = require("../controllers/ResetPassword")

const { auth } = require("../middlewares/auth")

// Routes for Login, Signup, and Authentication

// ********************************************************************************************************
//                                      Authentication routes
// ********************************************************************************************************

// Route for user login
router.post("/login", login)

// Route for user signup
router.post("/signup", signup)

// Route for sending OTP to the user's email
router.post("/sendotp", sendotp)

// Route for Changing the password
router.post("/changepassword", auth, changePassword)

// ********************************************************************************************************
//                                      Reset Password
// ********************************************************************************************************

// Route for generating a reset password token
router.post("/reset-password-token", resetPasswordToken)

// Route for resetting user's password after verification
router.post("/reset-password", resetPassword)

// Export the router for use in the main application
module.exports = router