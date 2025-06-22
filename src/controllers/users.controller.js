import UserRegister from '../dtos/user.dto.js';
import user from '../models/user.model.js';
import { validationResult } from 'express-validator';

export const newUser = async (req, res) => {
    //const errors = validationResult(req);
    console.log(req.user)
    // if (!errors.isEmpty()) {
    //     return res.status(400).json({ errors: errors.array() })
    // }
    // await user.insertOne({...(new UserRegister(req.body)), active: true})
    //     .then(doc => res.send(doc))
    //     .catch(error => res.send(error));
}

export const getAll = async (req, res) => {
    await user.find({})
        .then(docs => res.send(docs))
        .catch(error => res.send(error));
}

export const getById = async (req, res) => {
    await user.findOne(req.params)
        .then(docs => res.send(docs))
        .catch(error => res.send(error));
}

export const updateOne = async (req, res) => {
    console.log(req.body)
}

export const deleteOne = async (req, res) => {
    await user.deleteOne(req.params)
        .then(docs => res.send(docs))
        .catch(error => res.send(error));
}