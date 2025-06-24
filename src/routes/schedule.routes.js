import courseScheduleModel from '../models/courseSchedule.model.js';
import { createGenericController } from '../controllers/generic.controller.js';
import { createGenericRouter } from './generic.routes.js';
import { addOne, getAllSchedules } from '../controllers/schedules.controller.js';

const scheduleController = createGenericController(courseScheduleModel);

const customController = {
    ...scheduleController,
    addOne,
    getAll: getAllSchedules
};

export default createGenericRouter(customController);