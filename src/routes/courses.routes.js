import courseModel from '../models/course.model.js';
import { createGenericController } from '../controllers/generic.controller.js';
import { createGenericRouter } from './generic.routes.js';
import { addOne, getAllCourses } from '../controllers/courses.controller.js'

const courseController = createGenericController(courseModel);

const customController = {
    ...courseController,
    getAll: getAllCourses,
    addOne: addOne
};

export default createGenericRouter(customController);