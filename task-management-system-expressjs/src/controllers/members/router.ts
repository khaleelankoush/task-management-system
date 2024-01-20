import * as express from 'express';
import { getAll, get, create, update, remove } from './service';
import { memberMiddleware } from '../../middleware/member';
import { ownerMiddleware } from '../../middleware/owner';

export const router = express.Router();

router.get('/', memberMiddleware, getAll);

router.get('/:id', ownerMiddleware, get);

router.post('', memberMiddleware, create);

router.patch('/:id', ownerMiddleware, update);

router.delete('/:id', ownerMiddleware, remove);
