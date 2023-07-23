const express = require("express");
const router= express.Router();

// Import Controllers

// Course Controllers

const { createCourse, showAllCourses, getCourseDetails } = require("../controllers/Course") ;

// Categories Controller
const { createCategory, getAllCategories, categoryPageDetails } = require("../controllers/Categories") ;

// Sections Controllers

const {createSection, updateSection, deleteSection} = require ("../controllers/Section") ;

// Sub_section Conrollers

const {createSubSection, updateSubSection, deleteSubSection} = require("../controllers/SubSection") ;

// Rating Controller

const {createRating, getAverageRating, getAllRating, getCourseRating } = require("../controllers/RatingAndREview") ;


// Importing Middlewares
const { auth, isInstructor, isStudent, isAdmin } = require("../middlewares/Auth") ;


// Course Routes

// Courses can Only be Created by Instructors
router.post("/createCourse", auth, isInstructor, createCourse)
//Add a Section to a Course
router.post("/addSection", auth, isInstructor, createSection)
// Update a Section
router.post("/updateSection", auth, isInstructor, updateSection)
// Delete a Section
router.post("/deleteSection", auth, isInstructor, deleteSection)
// Edit Sub Section
router.post("/updateSubSection", auth, isInstructor, updateSubSection)
// Delete Sub Section
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection)
// Add a Sub Section to a Section
router.post("/addSubSection", auth, isInstructor, createSubSection)
// Get all Registered Courses
router.get("/getAllCourses", showAllCourses)
// Get Details for a Specific Courses
router.post("/getCourseDetails", getCourseDetails)


// category Routes (Only Admin)
router.post("/createCategory", auth, isAdmin, createCategory)
router.get("/showAllCategories", getAllCategories)
router.get("/getCategoryPageDetails", categoryPageDetails)

// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************
router.post("/createRating", auth, isStudent, createRating)
router.get("/getAverageRating", getAverageRating)
router.get("/getReviews", getAllRating),
router.get("/getCourseRating", getCourseRating)

module.exports = router;