import mongoose from "mongoose";

const courseSchema = mongoose.Schema({
    code: {
        type: String,
        trim: true
    },
    description: {
        type: String,
    },
    intensity: {
        type: Number,
    },
    weight: {
        type: Number,
    },
    topic: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'topics'}
    ],
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