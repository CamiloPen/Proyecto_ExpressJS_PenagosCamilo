import scheduleModel from '../models/courseSchedule.model.js';
import Schedule from '../dtos/schedule.dto.js';
import mongoose from 'mongoose';

export const addOne = async (req, res) => {

    let newschedule = new Schedule(req.body)
    const teacherId = new mongoose.Types.ObjectId(newschedule.teacher);
    const courseId = new mongoose.Types.ObjectId(newschedule.course);
    newschedule.course = courseId
    newschedule.teacher = teacherId

    await scheduleModel.insertOne({ ...newschedule, active: true })
        .then(doc => res.status(200).json(doc))
        .catch(error => res.send(error));
}

export const getAllSchedules = async (req, res) => {
    await scheduleModel.aggregate([
    {
        '$lookup': {
            'from': 'courses', 
            'localField': 'course', 
            'foreignField': '_id', 
            'as': 'course'
        }
    }, {
        '$unwind': {
            'path': '$course'
        }
    }, {
        '$lookup': {
            'from': 'users', 
            'localField': 'teacher', 
            'foreignField': '_id', 
            'as': 'teacher'
        }
    }, {
        '$unwind': {
            'path': '$teacher'
        }
    }
])
        .then(docs => res.status(200).json(docs))
        .catch(error => res.send(error));
}