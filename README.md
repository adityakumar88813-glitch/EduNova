# EduNova 🎓

EduNova is a full-stack online learning platform where students can explore courses, enroll in them, and learn through an interactive platform.

## 🚀 Features

* 🔐 User Authentication & Authorization
* 👨‍🎓 Student and Instructor functionality
* 📚 Browse and explore courses
* 🛒 Add courses to cart
* 💳 Course payment integration
* 🎥 Watch course videos
* 📊 Track course progress
* ⭐ Course ratings and reviews
* 📧 Email/OTP verification
* 📱 Responsive UI

## 🛠️ Tech Stack

### Frontend

* React.js
* Redux Toolkit
* React Router
* Tailwind CSS
* Axios
* React Hot Toast

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication

### Other Technologies

* Cloudinary
* Razorpay
* Git & GitHub

## 📂 Project Structure

```text
EduNova
│
├── frontend
│   ├── src
│   ├── public
│   └── package.json
│
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── middleware
│   └── package.json
│
└── README.md
```

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/adityakumar88813-glitch/EduNova.git
cd EduNova
```

### 2. Install Frontend Dependencies

```bash
cd frontend
npm install
```

### 3. Install Backend Dependencies

```bash
cd ../backend
npm install
```

### 4. Configure Environment Variables

Create `.env` files for the frontend and backend and add the required environment variables.

Example:

```env
MONGODB_URL=your_mongodb_url
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
RAZORPAY_KEY=your_razorpay_key
RAZORPAY_SECRET=your_razorpay_secret
```

### 5. Run the Application

Start the backend:

```bash
npm run dev
```

Start the frontend in another terminal:

```bash
npm start
```

## 🎯 Purpose

EduNova was built to provide a simple and interactive platform for online learning while giving instructors the ability to create and manage courses.

## 👨‍💻 Author

**Aditya Kumar**

B.Tech Electrical Engineering
NIT Silchar

GitHub: [Aditya Kumar](https://github.com/adityakumar88813-glitch)

## 📄 License

This project is created for educational and learning purposes.
