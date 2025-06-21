import express from 'express';
import { addOne, deleteOne, getAll, getById, updateOne } from '../controllers/courses.controller.js';
import { validations } from '../config/courses.validator.js';

const courseRouter  = express.Router();

courseRouter.post('/', validations, addOne);

courseRouter.get('/', getAll);

courseRouter.get('/:_id', getById);

courseRouter.put('/:_id', updateOne);

courseRouter.delete('/:_id', deleteOne);

export default courseRouter;