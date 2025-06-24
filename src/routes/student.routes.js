import userModel from '../models/user.model.js';
import { createGenericController } from '../controllers/generic.controller.js';
import { createGenericRouter } from './generic.routes.js';
import { getAllStudents } from '../controllers/users.controller.js';

const studentController = createGenericController(userModel);

export default createGenericRouter({
    ...studentController, getAll: getAllStudents
});