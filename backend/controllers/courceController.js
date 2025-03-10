const Course = require("../models/Course");

const addNewCourse = async (req, res) => {
    try {
        const courseData = req.body;
        const newlyCreatedCourse = new Course(courseData);
        const saveCourse = await newlyCreatedCourse.save();

        if (saveCourse) {
            res.status(201).json({
                success: true,
                message: "Course saved successfully",
                data: saveCourse,
            });
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Some error occured!",
        });
    }
};

const getAllCourses = async (req, res) => {
    try {
        const coursesList = await Course.find({});

        res.status(200).json({
            success: true,
            data: coursesList,
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Some error occured!",
        });
    }
};

const getCourseDetailsByID = async (req, res) => {
    try {
        const { id } = req.params;
        const courseDetails = await Course.findById(id);
        if (!courseDetails) {
            return res.status(404).json({
                success: false,
                message: "Course not found!",
            });
        }

        res.status(200).json({
            success: true,
            data: courseDetails,
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Some error occured!",
        });
    }
};

const updateCourseByID = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedCourseData = req.body;

        const updatedCourse = await Course.findByIdAndUpdate(
            id,
            updatedCourseData,
            { new: true }
        );

        if (!updatedCourse) {
            return res.status(404).json({
                success: false,
                message: "Course not found!",
            });
        }

        res.status(200).json({
            success: true,
            message: "Course updated successfully",
            data: updatedCourse,
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Some error occured!",
        });
    }
};

const getInstructorStats = async (req, res) => {
    try {
        const { instructorId } = req.params;
        const id = instructorId.startsWith(":") ? instructorId.substring(1) : instructorId;
        const courses = await Course.find({ instructorId: id }).sort({ date: -1 });

        if (!courses.length) {
            return res.status(404).json({
                success: false,
                message: "No courses found for this instructor.",
            });
        }

        const totalCourses = courses.length;
        const totalStudents = courses.reduce((acc, course) => acc + course.students.length, 0);
        const totalEarnings = courses.reduce((acc, course) => {
            return acc + course.students.reduce((sum, student) => sum + parseFloat(student.paidAmount || 0), 0);
        }, 0);

        const recentCourses = courses.slice(0, 5).map(course => ({
            title: course.title,
            date: course.date,
            studentsCount: course.students.length
        }));

        let allStudents = [];
        courses.forEach(course => {
            course.students.forEach(student => {
                allStudents.push({
                    name: student.studentName,
                    email: student.studentEmail,
                    paidAmount: student.paidAmount,
                    course: course.title,
                });
            });
        });

        const recentStudents = allStudents.slice(-5).reverse();

        res.status(200).json({
            success: true,
            stats: {
                totalCourses,
                totalStudents,
                totalEarnings,
                recentCourses,
                recentStudents
            },
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Some error occurred!",
        });
    }
};

module.exports = {
    addNewCourse,
    getAllCourses,
    updateCourseByID,
    getCourseDetailsByID,
    getInstructorStats
};