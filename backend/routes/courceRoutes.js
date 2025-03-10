const express = require("express");
const { addNewCourse, getAllCourses, getCourseDetailsByID, updateCourseByID, getInstructorStats } = require("../controllers/courceController");

const router = express.Router();

router.post("/add", addNewCourse);
router.get("/get", getAllCourses);
router.get("/get/details/:id", getCourseDetailsByID);
router.put("/update/:id", updateCourseByID);
router.get("/stats/:instructorId", getInstructorStats);

module.exports = router;