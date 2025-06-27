import express from 'express';
import courseScheduleModel from '../models/courseSchedule.model.js';
import { createGenericController } from '../controllers/generic.controller.js';
import { createGenericRouter } from './generic.routes.js';
import { addOne, getAllSchedules, getScheduleByStudents, getScheduleByTeachers, getStudentsByschedule, updateSchedule} from '../controllers/schedules.controller.js';

const scheduleController = createGenericController(courseScheduleModel);

const scheduleRouter = express.Router()

scheduleRouter.post('/', addOne)
scheduleRouter.get('/', getAllSchedules)
scheduleRouter.get('/courses', getScheduleByStudents)
scheduleRouter.get('/teachers', getScheduleByTeachers)
scheduleRouter.get('/students', getStudentsByschedule)
scheduleRouter.put('/:_id', updateSchedule)

scheduleRouter.use(createGenericRouter(scheduleController))

export default scheduleRouter