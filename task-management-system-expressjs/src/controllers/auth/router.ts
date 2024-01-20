import * as express from 'express';
import { login, logout, register } from './service';
import { authMiddleware } from '../../middleware/auth';

export const router = express.Router();

router.post('/login', login);

router.post('/register', register);

router.post('/logout', authMiddleware, logout);
