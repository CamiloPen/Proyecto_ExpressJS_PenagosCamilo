import topicModel from '../models/topic.model.js';
import { createGenericController } from '../controllers/generic.controller.js';
import { createGenericRouter } from './generic.routes.js';

const topicController = createGenericController(topicModel);

export default createGenericRouter(topicController);