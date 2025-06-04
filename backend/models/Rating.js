const mongoose = require("mongoose");

const RatingSchema = new mongoose.Schema({
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    review: { type: String, default: "" },
    createdAt: { type: Date, default: Date.now },
});

RatingSchema.index({ course: 1, user: 1 }, { unique: true });

module.exports = mongoose.model("Rating", RatingSchema);
