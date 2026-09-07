const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const { passwordUpdated } = require("../mail/passwordUpdate");

// =====================================================
// RESET PASSWORD TOKEN
// =====================================================

exports.resetPasswordToken = async (req, res) => {
  try {
    // 1. Get email from request body
    const { email } = req.body;

    // 2. Validate email
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Please enter your email",
      });
    }

    // 3. Check whether user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Your email is not registered with us",
      });
    }

    // 4. Generate unique reset token
    const token = crypto.randomUUID();

    // 5. Set token expiration time
    const resetPasswordExpires = Date.now() + 5 * 60 * 1000;

    // 6. Save token and expiration time in database
    await User.findOneAndUpdate(
      { email },
      {
        token,
        resetPasswordExpires,
      },
      { new: true }
    );

    // 7. Create reset password URL
    const url = `http://localhost:3000/update-password/${token}`;

    // 8. Send password reset email
    await mailSender(
      email,
      "Password Reset Link - EduNova",
      `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Password Reset Request</h2>

          <p>Hello,</p>

          <p>
            We received a request to reset your EduNova account password.
          </p>

          <p>
            Click the button below to reset your password:
          </p>

          <a
            href="${url}"
            style="
              display: inline-block;
              padding: 12px 20px;
              background-color: #000000;
              color: #ffffff;
              text-decoration: none;
              border-radius: 5px;
            "
          >
            Reset Password
          </a>

          <p style="margin-top: 20px;">
            This link will expire in <strong>5 minutes</strong>.
          </p>

          <p>
            If you did not request a password reset, you can safely ignore
            this email.
          </p>

          <p>
            Regards,<br />
            EduNova Team
          </p>
        </div>
      `
    );

    // 9. Send response
    return res.status(200).json({
      success: true,
      message:
        "Password reset email sent successfully. Please check your email.",
    });
  } catch (error) {
    console.error("Error while sending reset password email:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while sending reset password email",
    });
  }
};


// =====================================================
// RESET PASSWORD
// =====================================================

exports.resetPassword = async (req, res) => {
  try {
    // 1. Get data from request body
    const { password, confirmPassword, token } = req.body;

    // 2. Validate required fields
    if (!password || !confirmPassword || !token) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // 3. Check whether passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and confirm password do not match",
      });
    }

    // 4. Find user using reset token
    const userDetails = await User.findOne({ token });

    // 5. Invalid token
    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: "Token is invalid",
      });
    }

    // 6. Check whether token has expired
    if (
      !userDetails.resetPasswordExpires ||
      userDetails.resetPasswordExpires < Date.now()
    ) {
      return res.status(400).json({
        success: false,
        message: "Token is expired. Please generate a new token",
      });
    }

    // 7. Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 8. Get user's name
    const userName =
      userDetails.firstName ||
      userDetails.name ||
      "User";

    // 9. Update password and remove reset token
    await User.findOneAndUpdate(
      { token },
      {
        password: hashedPassword,
        token: undefined,
        resetPasswordExpires: undefined,
      },
      { new: true }
    );

    // 10. Send password update confirmation email
    await mailSender(
      userDetails.email,
      "Password Update Confirmation - EduNova",
      passwordUpdated(userDetails.email, userName)
    );

    // 11. Return success response
    return res.status(200).json({
      success: true,
      message:
        "Password reset successful. A confirmation email has been sent.",
    });
  } catch (error) {
    console.error("Error while resetting password:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while resetting password",
    });
  }
};