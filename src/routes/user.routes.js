import express from 'express';
import userModel from '../models/user.model.js';
import { createGenericController } from '../controllers/generic.controller.js';
import { createGenericRouter } from './generic.routes.js';
import { newUser, getUser } from '../controllers/users.controller.js';

const userController = createGenericController(userModel);

const userRouter = express.Router();

userRouter.put('/register', newUser);
userRouter.get('/', getUser);

userRouter.use(createGenericRouter(userController));

export default userRouter;