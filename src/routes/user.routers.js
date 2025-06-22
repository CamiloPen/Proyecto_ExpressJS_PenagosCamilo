import express from 'express';
import { deleteOne, getAll, getById, updateOne } from '../controllers/users.controller.js';

const userRouter  = express.Router();

userRouter.get('/', getAll);

userRouter.get('/:_id', getById);

userRouter.patch('/', updateOne);

userRouter.delete('/:_id', deleteOne);

export default userRouter;