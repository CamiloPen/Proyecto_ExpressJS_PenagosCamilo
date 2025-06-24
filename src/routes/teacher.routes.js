import teacherModel from '../models/user.model.js';
import { createGenericController } from '../controllers/generic.controller.js';
import { createGenericRouter } from './generic.routes.js';
import { getAllTeachers } from '../controllers/users.controller.js';

const teacherController = createGenericController(teacherModel);

export default createGenericRouter({
    ...teacherController, getAll: getAllTeachers
});