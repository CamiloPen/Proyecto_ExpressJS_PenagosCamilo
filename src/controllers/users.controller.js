import user from '../models/user.model.js';

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