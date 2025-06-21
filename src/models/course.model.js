import mongoose from "mongoose";

const courseSchema = mongoose.Schema({
    code: {
        type: String,
        trim: true
    },
    description: {
        type: String,
    },
    intensity:  {
        type: Number,
    },
    weight: {
        type: Number,
    },
    topic: {
        code: String,
        title: String,
        description: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    active: {
        type: Boolean
    }
})

const Course = mongoose.model('courses', courseSchema);

export default Course;