import * as express from 'express';
import { getAll, get, create, update, remove } from './service';
import { memberMiddleware } from '../../middleware/member';
import { taskMemberMiddleware } from '../../middleware/task-member';
import { statusMemberMiddleware } from '../../middleware/status-member';

export const router = express.Router();

router.get('/', memberMiddleware, getAll);

router.get('/:id', taskMemberMiddleware, get);

router.post('', statusMemberMiddleware, create);

router.patch('/:id', taskMemberMiddleware, update);

router.delete('/:id', taskMemberMiddleware, remove);
