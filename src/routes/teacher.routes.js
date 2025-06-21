import express from 'express';
import user from '../models/user.model.js';

const teacherRouter  = express.Router();

teacherRouter.get('/', (req, res) => {
    user.find({rol: 'Teacher'})
        .then(docs => res.send(docs))
        .catch(error => res.send(error));
});

teacherRouter.put('/:_id', (req, res) => {
    user.updateOne(req.params, { $set: req.body })
        .then(docs => res.send(docs))
        .catch(error => res.send(error));
});

teacherRouter.delete('/:_id', (req, res) => {
    user.deleteOne(req.params)
        .then(docs => res.send(docs))
        .catch(error => res.send(error));
});

export default teacherRouter;