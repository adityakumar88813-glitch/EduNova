const express = require("express");

const router = express.Router();

// Controllers
const {
  login,
  signup,
  sendotp,
  changePassword,
} = require("../controllers/Auth");

const {
  resetPasswordToken,
  resetPassword,
} = require("../controllers/ResetPassword");

const {
  getAllUserDetails,
  updateProfile,
  deleteAccount,
} = require("../controllers/Profile");

// Middleware
const { auth } = require("../middlewares/auth");

// ================= AUTH ROUTES =================

router.post("/login", login);

router.post("/signup", signup);

router.post("/sendotp", sendotp);

router.post("/changepassword", auth, changePassword);

// ================= PASSWORD RESET =================

 router.post("/reset-password-token", resetPasswordToken);

router.post("/reset-password", resetPassword);

// ================= PROFILE ROUTES =================

router.get("/getUserDetails", auth, getAllUserDetails);

router.put("/updateProfile", auth, updateProfile);

router.delete("/deleteProfile", auth, deleteAccount);

module.exports = router;