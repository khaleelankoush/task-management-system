import * as express from 'express';
import { getAll, get, create, update, remove } from './service';
import { memberMiddleware } from '../../middleware/member';
import { statusMemberMiddleware } from '../../middleware/status-member';

export const router = express.Router();

router.get('/', memberMiddleware, getAll);

router.get('/:id', statusMemberMiddleware, get);

router.post('', memberMiddleware, create);

router.patch('/:id', statusMemberMiddleware, update);

router.delete('/:id', statusMemberMiddleware, remove);
