

const mongoose = require('mongoose');

const ProgresSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    completedLectures: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lecture' }],
    progress: { type: Number, default: 0 },
    lastAccessed: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Progres', ProgresSchema);
