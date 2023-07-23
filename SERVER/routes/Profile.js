const express = require("express");
const router= express.Router();

const {updateProfile, deleteAccount, getAllUserDetails, getEnrolledCourses, updateDisplayPicture} = require("../controllers/Profile") ;
const { auth, isStudent } = require("../middlewares/Auth") ;


// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************
// Delet User Account
router.delete("/deleteProfile", auth, isStudent, deleteAccount)
router.put("/updateProfile", auth, updateProfile)
router.get("/getUserDetails", auth, getAllUserDetails)
// Get Enrolled Courses
router.get("/getEnrolledCourses", auth, getEnrolledCourses)
router.put("/updateDisplayPicture", auth, updateDisplayPicture)

module.exports = router