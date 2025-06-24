import course from '../models/course.model.js';
import Course from '../dtos/course.dto.js';
import mongoose from 'mongoose';

export const addOne = async (req, res) => {
    
    let newCourse = new Course(req.body)
    const topicObjectIds = newCourse.topic.map(id => new mongoose.Types.ObjectId(id));
    newCourse.topic = topicObjectIds

    await course.insertOne({ ...newCourse, active: true })
        .then(doc => res.status(200).json(doc))
        .catch(error => res.send(error));
}

export const getAllCourses = async (req, res) => {
    await course.aggregate([
        {
            '$unwind': {
                'path': '$topic'
            }
        }, {
            '$lookup': {
                'from': 'topics',
                'localField': 'topic',
                'foreignField': '_id',
                'as': 'topic'
            }
        }, {
            '$unwind': {
                'path': '$topic'
            }
        }, {
            '$group': {
                '_id': '$_id',
                'code': {
                    '$first': '$code'
                },
                'description': {
                    '$first': '$description'
                },
                'weight': {
                    '$first': '$weight'
                },
                'intensity': {
                    '$first': '$intensity'
                },
                'topics': {
                    '$push': '$topic'
                }
            }
        }
    ])
        .then(docs => res.status(200).json(docs))
        .catch(error => res.send(error));
}