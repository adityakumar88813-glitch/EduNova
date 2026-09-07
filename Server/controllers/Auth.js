const bcrypt = require("bcrypt");
const User = require("../models/User");
const OTP = require("../models/OTP");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const mailSender = require("../utils/mailSender");
const { passwordUpdated } = require("../mail/passwordUpdate");
const Profile = require("../models/Profile");
require("dotenv").config();
const emailTemplate = require("../mail/emailVerificationTemplate");

// =====================================================
// SIGNUP CONTROLLER
// =====================================================

exports.signup = async (req, res) => {
	try {
		// Get data from request body
		const {
			firstName,
			lastName,
			email,
			password,
			confirmPassword,
			accountType,
			contactNumber,
			otp,
		} = req.body;

		// Check required fields
		if (
			!firstName ||
			!lastName ||
			!email ||
			!password ||
			!confirmPassword ||
			!otp
		) {
			return res.status(403).json({
				success: false,
				message: "All Fields are required",
			});
		}

		// Check password match
		if (password !== confirmPassword) {
			return res.status(400).json({
				success: false,
				message:
					"Password and Confirm Password do not match. Please try again.",
			});
		}

		// Check existing user
		const existingUser = await User.findOne({ email });

		if (existingUser) {
			return res.status(400).json({
				success: false,
				message: "User already exists. Please sign in to continue.",
			});
		}

		// Find latest OTP
		const response = await OTP.find({ email })
			.sort({ createdAt: -1 })
			.limit(1);

		console.log(response);

		if (response?.length === 0) {
			return res.status(400).json({
				success: false,
				message: "The OTP is not valid",
			});
		}

		if (otp !== response[0].otp) {
			return res.status(400).json({
				success: false,
				message: "The OTP is not valid",
			});
		}

		// Hash password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Instructor approval
		let approved = "";

		approved === "Instructor"
			? (approved = false)
			: (approved = true);

		// Create profile
		const profileDetails = await Profile.create({
			gender: null,
			dateOfBirth: null,
			about: null,
			contactNumber: null,
		});

		// Create user
		const user = await User.create({
			firstName,
			lastName,
			email,
			contactNumber,
			password: hashedPassword,
			accountType,
			approved,
			additionalDetails: profileDetails._id,
			image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
		});

		return res.status(200).json({
			success: true,
			user,
			message: "User registered successfully",
		});

	} catch (error) {
		console.error("SIGNUP ERROR:", error);

		return res.status(500).json({
			success: false,
			message: "User cannot be registered. Please try again.",
		});
	}
};

// =====================================================
// LOGIN CONTROLLER
// =====================================================

exports.login = async (req, res) => {
	try {
		// Get email and password
		const { email, password } = req.body;

		// Validate fields
		if (!email || !password) {
			return res.status(400).json({
				success: false,
				message: "Please Fill up All the Required Fields",
			});
		}

		// Find user
		const user = await User.findOne({ email })
			.populate("additionalDetails");

		// User not found
		if (!user) {
			return res.status(401).json({
				success: false,
				message:
					"User is not Registered with Us Please SignUp to Continue",
			});
		}

		// Compare password
		if (await bcrypt.compare(password, user.password)) {

			// Generate JWT
			const token = jwt.sign(
				{
					email: user.email,
					id: user._id,
					accountType: user.accountType,
				},
				process.env.JWT_SECRET,
				{
					expiresIn: "7d",
				}
			);

			// Save token
			user.token = token;

			// Don't return password
			user.password = undefined;

			// Cookie options
			const options = {
				expires: new Date(
					Date.now() + 3 * 24 * 60 * 60 * 1000
				),
				httpOnly: true,
			};

			return res
				.cookie("token", token, options)
				.status(200)
				.json({
					success: true,
					token,
					user,
					message: "User Login Success",
				});

		} else {

			return res.status(401).json({
				success: false,
				message: "Password is incorrect",
			});
		}

	} catch (error) {
		console.error("LOGIN ERROR:", error);

		return res.status(500).json({
			success: false,
			message: "Login Failure Please Try Again",
		});
	}
};

// =====================================================
// SEND OTP
// =====================================================

exports.sendotp = async (req, res) => {
	try {
		const { email } = req.body;

		// Check existing user
		const checkUserPresent = await User.findOne({ email });

		if (checkUserPresent) {
			return res.status(409).json({
				success: false,
				message: "User is Already Registered",
			});
		}

		// Generate OTP
		const otp = otpGenerator.generate(6, {
			upperCaseAlphabets: false,
			lowerCaseAlphabets: false,
			specialChars: false,
		});

		console.log("Generated OTP:", otp);

		// OTP payload
		const otpPayload = {
			email,
			otp,
		};

		// Save OTP
		const otpBody = await OTP.create(otpPayload);

		console.log("OTP Body:", otpBody);

		// Send verification email
		const mailResponse = await mailSender(
			email,
			"Verification Email",
			emailTemplate(otp)
		);

		console.log(
			"OTP email sent successfully:",
			mailResponse.messageId
		);

		return res.status(200).json({
			success: true,
			message: "OTP Sent Successfully",
		});

	} catch (error) {
		console.log("SEND OTP ERROR:", error);

		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

// =====================================================
// CHANGE PASSWORD
// =====================================================

exports.changePassword = async (req, res) => {
	try {

		// -------------------------------------------------
		// 1. Get logged-in user
		// -------------------------------------------------

		const userDetails = await User.findById(req.user.id);

		if (!userDetails) {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}

		// -------------------------------------------------
		// 2. Get password data
		// -------------------------------------------------

		const {
			oldPassword,
			newPassword,
			confirmNewPassword,
		} = req.body;

		// -------------------------------------------------
		// 3. Validate fields
		// -------------------------------------------------

		if (
			!oldPassword ||
			!newPassword ||
			!confirmNewPassword
		) {
			return res.status(400).json({
				success: false,
				message: "All password fields are required",
			});
		}

		// -------------------------------------------------
		// 4. Check old password
		// -------------------------------------------------

		const isPasswordMatch = await bcrypt.compare(
			oldPassword,
			userDetails.password
		);

		if (!isPasswordMatch) {
			return res.status(401).json({
				success: false,
				message: "The old password is incorrect",
			});
		}

		// -------------------------------------------------
		// 5. Check new password confirmation
		// -------------------------------------------------

		if (newPassword !== confirmNewPassword) {
			return res.status(400).json({
				success: false,
				message:
					"The new password and confirm password do not match",
			});
		}

		// -------------------------------------------------
		// 6. Hash new password
		// -------------------------------------------------

		const encryptedPassword = await bcrypt.hash(
			newPassword,
			10
		);

		// -------------------------------------------------
		// 7. Update password in database
		// -------------------------------------------------

		const updatedUserDetails = await User.findByIdAndUpdate(
			req.user.id,
			{
				password: encryptedPassword,
			},
			{
				new: true,
			}
		);

		if (!updatedUserDetails) {
			return res.status(404).json({
				success: false,
				message: "User could not be updated",
			});
		}

		// -------------------------------------------------
		// 8. Create professional email HTML
		// -------------------------------------------------

		const emailBody = passwordUpdated(
			updatedUserDetails.email,
			`${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
		);

		// -------------------------------------------------
		// 9. Send confirmation email
		// -------------------------------------------------

		try {

			const emailResponse = await mailSender(
				updatedUserDetails.email,
				"Password Update Confirmation - EduNova",
				emailBody
			);

			console.log(
				"Password update email sent successfully:",
				emailResponse.messageId
			);

		} catch (error) {

			console.error(
				"Password update email error:",
				error
			);

			// Password has already been changed,
			// so don't tell the user that password update failed.
			return res.status(200).json({
				success: true,
				message:
					"Password updated successfully, but confirmation email could not be sent.",
			});
		}

		// -------------------------------------------------
		// 10. Final response
		// -------------------------------------------------

		return res.status(200).json({
			success: true,
			message:
				"Password updated successfully. A confirmation email has been sent.",
		});

	} catch (error) {

		console.error(
			"Error occurred while updating password:",
			error
		);

		return res.status(500).json({
			success: false,
			message: "Error occurred while updating password",
			error: error.message,
		});
	}
};