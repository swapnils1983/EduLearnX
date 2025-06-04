const express = require("express");
const {
    updateStudentProgress,
    getStudentProgress,
} = require('../controllers/progresController');

const router = express.Router();

router.post('/', updateStudentProgress);
router.get('/:courseId/:studentId', getStudentProgress);
// router.get('/:studentId/purchased-courses', fetchStudentPurchasedCourses);

module.exports = router;