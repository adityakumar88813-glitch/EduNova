
const otpTemplate = (otp) => {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>OTP Verification Email</title>

  <style>
    body {
      background-color: #ffffff;
      font-family: Arial, sans-serif;
      font-size: 16px;
      line-height: 1.4;
      color: #333333;
      margin: 0;
      padding: 0;
    }

    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      text-align: center;
    }

    .logo {
      max-width: 200px;
      margin-bottom: 20px;
    }

    .message {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 20px;
    }

    .body {
      font-size: 16px;
      margin-bottom: 20px;
    }

    .highlight {
      font-size: 22px;
      font-weight: bold;
      color: #000000;
      margin: 20px 0;
    }

    .support {
      font-size: 14px;
      color: #999999;
      margin-top: 20px;
    }
  </style>
</head>

<body>
  <div class="container">

   <a
  href="https://res.cloudinary.com/dnyovtdwv/image/upload/v1787636520/stocksnap-books-2596809_je5c46.jpg"
  style="text-decoration:none;"
>
  <img
    src="https://res.cloudinary.com/dnyovtdwv/image/upload/v1787636520/stocksnap-books-2596809_je5c46.jpg"
    alt="EduNova Logo"
    width="180"
    style="display:block; width:180px; max-width:100%; height:auto; margin:0 auto 25px auto; border:0;"
  />
</a>

    <div class="message">
      OTP Verification Email
    </div>

    <div class="body">
      <p>Dear User,</p>

      <p>
        Thank you for registering with EduNova. To complete your registration,
        please use the following OTP (One-Time Password) to verify your account:
      </p>

      <h2 class="highlight">${otp}</h2>

      <p>
        This OTP is valid for 5 minutes. If you did not request this verification,
        please ignore this email.
      </p>

      <p>
        Once your account is verified, you will have access to our platform
        and its features.
      </p>
    </div>

    <div class="support">
      If you have any questions, feel free to reach us at 
      <a href="mailto:info@EduNova.com">info@Edunova.com</a>
    </div>

  </div>
</body>

</html>`;
};

module.exports = otpTemplate;