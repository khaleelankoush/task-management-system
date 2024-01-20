import * as express from 'express';
import { getAll, get, create, update, remove } from './service';
import { boardMemberMiddleware } from '../../middleware/board-member';
import { boardOwnerMiddleware } from '../../middleware/board-owner';

export const router = express.Router();

router.get('/', getAll);

router.get('/:id', boardMemberMiddleware, get);

router.post('', create);

router.patch('/:id', boardOwnerMiddleware, update);

router.delete('/:id', boardOwnerMiddleware, remove);
