const jwt = require("jsonwebtoken");
require("dotenv").config();

// ================= AUTH =================
exports.auth = async (req, res, next) => {
  try {
    // Extract token from Authorization header
    const authHeader = req.header("Authorization");

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Token is missing",
      });
    }

    // Expected format: Bearer <token>
    const token = authHeader.replace("Bearer ", "").trim();

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is missing",
      });
    }

    // Verify token
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);

      console.log("Decoded Token:", decode);

      // Store decoded user information in request
      req.user = decode;
    } catch (error) {
      console.log("JWT Verification Error:", error.message);

      return res.status(401).json({
        success: false,
        message: "Token is invalid or expired",
      });
    }

    next();
  } catch (error) {
    console.log("AUTH ERROR:", error);

    return res.status(401).json({
      success: false,
      message: "Something went wrong while validating the token",
    });
  }
};


// ================= STUDENT =================
exports.isStudent = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Student") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for students",
      });
    }

    next();
  } catch (error) {
    console.log("STUDENT AUTH ERROR:", error);

    return res.status(401).json({
      success: false,
      message: "User role cannot be verified",
    });
  }
};


// ================= INSTRUCTOR =================
exports.isInstructor = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Instructor") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for instructors",
      });
    }

    next();
  } catch (error) {
    console.log("INSTRUCTOR AUTH ERROR:", error);

    return res.status(401).json({
      success: false,
      message: "User role cannot be verified",
    });
  }
};


// ================= ADMIN =================
exports.isAdmin = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for admins",
      });
    }

    next();
  } catch (error) {
    console.log("ADMIN AUTH ERROR:", error);

    return res.status(401).json({
      success: false,
      message: "User role cannot be verified",
    });
  }
};