
const express = require("express")
const router = express.Router();
const {auth} = require("../middlewares/auth")

const {
    deleteAccount,
    updateprofile,
    getAllUserDetails,
    updateDisplayPicture,
    getEnrolledCourse,
} = require("../controllers/Profile")

//deleteUserAccount
router.delete("/deleteProfile",auth,deleteAccount);
router.put("/updateProfile",auth,updateprofile);
router.get("/getUserDetails",auth ,getAllUserDetails);

// //get enrolled course
//  router.get("/getEnrolledCourse",auth ,getEnrolledCourse);
//   router.put("/updateDisplayPicture",auth ,updateDisplayPicture);


module.exports = router
