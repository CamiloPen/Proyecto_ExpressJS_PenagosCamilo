import mongoose from "mongoose";

const courseScheduleSchema = new mongoose.Schema({
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
        start: Number,
        end: Number,
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
    createdAt: {
        type: Date,
        default: Date.now
    },
    active: {
        type: Boolean
    }
},{
  collection: 'courseSchedules'
})

const courseScheduleModel = mongoose.model('courseSchedules', courseScheduleSchema);

export default courseScheduleModel;