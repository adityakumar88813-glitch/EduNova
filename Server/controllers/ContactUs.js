const { contactUsEmail } = require("../mail/contactFormRes");
const mailSender = require("../utils/mailSender");

exports.contactUsController = async (req, res) => {
  const {
    email,
    firstname,
    lastname,
    message,
    phoneNo,
    countrycode,
  } = req.body;

  console.log("CONTACT FORM DATA:", req.body);

  try {
    if (!email || !firstname || !message || !phoneNo) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    const emailRes = await mailSender(
      process.env.CONTACT_EMAIL,
      "New EduNova Contact Message",
      contactUsEmail(
        email,
        firstname,
        lastname,
        message,
        phoneNo,
        countrycode
      )
    );

    console.log("EMAIL RESPONSE:", emailRes);

    return res.status(200).json({
      success: true,
      message: "Message sent successfully!",
    });
  } catch (error) {
    console.log("========== CONTACT EMAIL ERROR ==========");
    console.log(error);
    console.log("ERROR MESSAGE:", error.message);
    console.log("=========================================");

    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong...",
    });
  }
};