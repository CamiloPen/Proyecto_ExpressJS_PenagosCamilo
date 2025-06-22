import express from 'express';
import {newUser, deleteOne, getAll, getById, updateOne } from '../controllers/users.controller.js';
import { userValidations } from '../config/validations.js';

const userRouter  = express.Router();

userRouter.post('/',userValidations, newUser);

userRouter.get('/', getAll);

userRouter.get('/:_id', getById);

userRouter.put('/', updateOne);

userRouter.delete('/:_id', deleteOne);

export default userRouter;