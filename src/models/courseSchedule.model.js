import mongoose from "mongoose";

const courseScheduleSchema = mongoose.Schema({
    code: {
        type: String,
        require: true,
        trim: true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'courses'
    },
    schedule:  {
        start: Date,
        end: Date,
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'teachers'
    },
    classroom: {
        code: String,
        description: String,
        capacity: Number
    },
    students: [{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        },
        rate: Number,
        registerDate: {
            type: Date,
            default: Date.now
        },
        comment: String
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    active: {
        type: Boolean
    }
})

const courseScheduleModel = mongoose.model('courseschedules', courseScheduleSchema);

export default courseScheduleModel;