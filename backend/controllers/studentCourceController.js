const StudentCourses = require("../models/StudentCources");
const Progres = require("../models/Progress");

const getCoursesByStudentId = async (req, res) => {
    try {
        const { studentId } = req.params;

        const studentBoughtCourses = await StudentCourses.findOne({ userId: studentId });

        if (!studentBoughtCourses || studentBoughtCourses.courses.length === 0) {
            return res.status(404).json({ success: false, message: "No courses found for this student." });
        }

        const coursesWithProgress = await Promise.all(
            studentBoughtCourses.courses.map(async (course) => {
                const progressDoc = await Progres.findOne({
                    studentId,
                    courseId: course.courseId,
                });

                return {
                    courseId: course.courseId,
                    title: course.title,
                    instructor: course.instructorName,
                    courseImage: course.courseImage,
                    completedLectures: progressDoc?.completedLectures?.length || 0,
                    progress: progressDoc?.progress || 0,
                    lastAccessed: progressDoc?.lastAccessed || null,
                };
            })
        );

        res.status(200).json({
            success: true,
            data: coursesWithProgress,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Some error occurred!",
        });
    }
};

module.exports = { getCoursesByStudentId };
