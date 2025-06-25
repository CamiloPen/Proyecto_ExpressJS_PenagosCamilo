import express from 'express';
import userModel from '../models/user.model.js';
import { createGenericController } from '../controllers/generic.controller.js';
import { createGenericRouter } from './generic.routes.js';
import { newUser, getUser, getAllTeachers, getAllStudents } from '../controllers/users.controller.js';
const userController = createGenericController(userModel);

const userRouter = express.Router();

userRouter.put('/register', newUser);
userRouter.get('/', getUser);
userRouter.get('/teachers', getAllTeachers);
userRouter.get('/students', getAllStudents);

userRouter.use(createGenericRouter(userController));

export default userRouter;