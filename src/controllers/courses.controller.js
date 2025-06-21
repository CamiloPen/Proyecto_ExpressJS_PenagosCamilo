import course from '../models/course.model.js';
import Course from '../dtos/course.dto.js';
import { validationResult } from 'express-validator';

export const addOne = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    await course.insertOne({...(new Course(req.body)), active: true})
        .then(doc => res.send(doc))
        .catch(error => res.send(error));
}

export const getAll = async (req, res) => {
    await course.find({})
        .then(docs => res.send(docs))
        .catch(error => res.send(error));
}

export const getById = async (req, res) => {
    await course.findOne(req.params)
        .then(docs => res.send(docs))
        .catch(error => res.send(error));
}

export const updateOne = async (req, res) => {
    await course.updateOne(req.params, { $set: req.body })
        .then(docs => res.send(docs))
        .catch(error => res.send(error));
}

export const deleteOne = async (req, res) => {
    course.deleteOne(req.params)
        .then(docs => res.send(docs))
        .catch(error => res.send(error));
}