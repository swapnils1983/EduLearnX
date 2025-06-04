const mongoose = require("mongoose");

const LectureSchema = new mongoose.Schema({
    title: String,
    videoUrl: String,
    public_id: String,
    freePreview: Boolean,
});

const RatingSchema = new mongoose.Schema({
    studentId: String,
    studentName: String,
    rating: {
        type: Number,
        min: 1,
        max: 5,
    },
});

const CommentSchema = new mongoose.Schema({
    studentId: String,
    studentName: String,
    comment: String,
    date: {
        type: Date,
        default: Date.now,
    },
});

const CourseSchema = new mongoose.Schema({
    instructorId: String,
    instructorName: String,
    date: Date,
    title: String,
    category: String,
    level: String,
    Duration: Number,
    Prerequisites: String,
    description: String,
    image: String,
    pricing: Number,

    students: [
        {
            studentId: String,
            studentName: String,
            studentEmail: String,
            paidAmount: String,
        },
    ],
    curriculum: [LectureSchema],
    isPublised: Boolean,
    ratings: [RatingSchema],
    comments: [CommentSchema],
});

module.exports = mongoose.model("Course", CourseSchema);