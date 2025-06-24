import express from 'express';

export const createGenericRouter = (controller) => {
  const router = express.Router();

  router.post('/', controller.addOne);
  router.get('/', controller.getAll);
  router.get('/:_id', controller.getById);
  router.put('/:_id', controller.updateOne);
  router.delete('/:_id', controller.deleteOne);

  return router;
};