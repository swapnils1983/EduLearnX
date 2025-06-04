const StudentProgress = require("../models/Progress.js");
const Course = require("../models/Course.js");

// Update progress
const updateStudentProgress = async (req, res) => {
    const { courseId, lectureId, studentId } = req.body;
    // console.log(typeof (lectureId))
    // console.log(courseId, lectureId, studentId)
    try {
        let progress = await StudentProgress.findOne({ courseId, studentId });
        if (!progress) {
            progress = new StudentProgress({ courseId, studentId, completedLectures: [] });
        }

        if (!progress.completedLectures.includes(lectureId)) {
            progress.completedLectures.push(lectureId);
        }

        const course = await Course.findById(courseId);
        const totalLectures = course.curriculum.length;
        const completedCount = progress.completedLectures.length;
        progress.progress = Math.round((completedCount / totalLectures) * 100);
        progress.lastAccessed = new Date();

        await progress.save();
        res.status(200).json({ message: "Progress updated", progress });
    } catch (err) {
        console.error("Error updating progress:", err);
        res.status(500).json({ message: "Error updating progress" });
    }
};

// Get progress
const getStudentProgress = async (req, res) => {
    const { courseId, studentId } = req.params;
    // console.log(courseId, studentId)
    try {
        const progress = await StudentProgress.findOne({ courseId, studentId });
        res.status(200).json(progress || { completedLectures: [], progress: 0 });
    } catch (err) {
        console.error("Error getting progress:", err);
        res.status(500).json({ message: "Error getting progress" });
    }
};

module.exports = { updateStudentProgress, getStudentProgress };