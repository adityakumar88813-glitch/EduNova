
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


module.exports = router;