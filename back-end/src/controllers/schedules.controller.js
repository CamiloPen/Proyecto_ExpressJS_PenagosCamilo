import schedule from '../models/courseSchedule.model.js';
import Schedule from '../dtos/schedule.dto.js';
import mongoose from 'mongoose';

function change(schedule) {
    let newschedule = new Schedule(schedule)
    newschedule.students = newschedule.students.map(_id => ({
        _id: new mongoose.Types.ObjectId(_id),
    }))
    newschedule.course = new mongoose.Types.ObjectId(newschedule.course);
    newschedule.teacher = new mongoose.Types.ObjectId(newschedule.teacher);
    newschedule.classroom.capacity = Number(newschedule.classroom.capacity)

    return newschedule
}

export const addOne = async (req, res) => {
    await schedule.insertOne({ ...change(req.body), active: true })
        .then(doc => res.status(200).json(doc))
        .catch(error => res.send(error));
}

export const updateSchedule = async (req, res) => {
    const { _id } = req.params

    await schedule.updateOne({ _id }, { $set: change(req.body) })
        .then(doc => res.status(200).json(doc))
        .catch(error => res.send(error));
}

export const getAllSchedules = async (req, res) => {
    await schedule.aggregate([
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

export const getStudentsByschedule = async (req, res) => {
    await schedule.aggregate([
        {
            $lookup: {
                from: 'courses',
                localField: 'course',
                foreignField: '_id',
                as: 'course'
            }
        },
        { $unwind: { path: '$course' } },
        {
            $lookup: {
                from: 'users',
                localField: 'teacher',
                foreignField: '_id',
                as: 'teacher'
            }
        },
        { $unwind: { path: '$teacher' } },
        { $unwind: { path: '$students' } },
        {
            $lookup: {
                from: 'users',
                localField: 'students._id',
                foreignField: '_id',
                as: 'students'
            }
        },
        { $unwind: { path: '$students' } },
        {
            $group: {
                _id: '$_id',
                code: { $first: '$code' },
                course: { $first: '$course' },
                schedule: { $first: '$schedule' },
                teacher: { $first: '$teacher' },
                classroom: { $first: '$classroom' },
                students: { $push: '$students' }
            }
        }
    ])
        .then(docs => res.status(200).json(docs))
        .catch(error => res.send(error));
}

export const getScheduleByStudents = async (req, res) => {
    await schedule.aggregate([
        { $unwind: { path: '$students' } },
        {
            $lookup: {
                from: 'users',
                localField: 'students._id',
                foreignField: '_id',
                as: 'students'
            }
        },
        { $unwind: { path: '$students' } },
        {
            $match: {
                'students._id': req.user._id
            }
        },
        {
            $lookup: {
                from: 'courses',
                localField: 'course',
                foreignField: '_id',
                as: 'course'
            }
        },
        { $unwind: { path: '$course' } },
        {
            $lookup: {
                from: 'users',
                localField: 'teacher',
                foreignField: '_id',
                as: 'teacher'
            }
        },
        { $unwind: { path: '$teacher' } },
        { $unwind: { path: '$course.topic' } },
        {
            $lookup: {
                from: 'topics',
                localField: 'course.topic',
                foreignField: '_id',
                as: 'course.topic'
            }
        },
        { $unwind: { path: '$course.topic' } },
        {
            $group: {
                _id: '$_id',
                code: { $first: '$code' },
                course: { $first: '$course' },
                topics: { $push: '$course.topic' },
                schedule: { $first: '$schedule' },
                teacher: { $first: '$teacher' },
                classroom: { $first: '$classroom' },
                student: { $first: '$students' }
            }
        }
    ])
        .then(docs => res.status(200).json(docs))
        .catch(error => res.send(error));
}

export const getScheduleByTeachers = async (req, res) => {
    await schedule.aggregate([
        {
            $match: {
                teacher: req.user._id
            }
        },
        {
            $lookup: {
                from: 'courses',
                localField: 'course',
                foreignField: '_id',
                as: 'course'
            }
        },
        { $unwind: { path: '$course' } },
        {
            $lookup: {
                from: 'users',
                localField: 'teacher',
                foreignField: '_id',
                as: 'teacher'
            }
        },
        { $unwind: { path: '$teacher' } },
        { $unwind: { path: '$course.topic' } },
        {
            $lookup: {
                from: 'topics',
                localField: 'course.topic',
                foreignField: '_id',
                as: 'course.topic'
            }
        },
        { $unwind: { path: '$course.topic' } },
        {
            $group: {
                _id: '$_id',
                code: { $first: '$code' },
                course: { $first: '$course' },
                topics: { $push: '$course.topic' },
                schedule: { $first: '$schedule' },
                teacher: { $first: '$teacher' },
                classroom: { $first: '$classroom' },
                student: { $first: '$students' }
            }
        }
    ])
        .then(docs => res.status(200).json(docs))
        .catch(error => res.send(error));
}