import { Router } from 'express';
import { handleCreateTask } from '../controllers/tasks.controller';

/**
 * Task routes.
 *
 * @spec REQ-TC-01
 */
const tasksRouter = Router();

tasksRouter.post('/', handleCreateTask);

export default tasksRouter;
