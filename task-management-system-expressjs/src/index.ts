import * as express from 'express';
import * as bodyParser from 'body-parser';
import './models/index';
import { router as auth } from './controllers/auth/router';
import { router as boards } from './controllers/boards/router';
import { router as members } from './controllers/members/router';
import { router as statuses } from './controllers/statuses/router';
import { router as tasks } from './controllers/tasks/router';
import { authMiddleware } from './middleware/auth';

const app = express();

app.use(bodyParser.json());

app.use('/api/auth', auth);
app.use('/api/boards', authMiddleware, boards);
app.use('/api/members', authMiddleware, members);
app.use('/api/statuses', authMiddleware, statuses);
app.use('/api/tasks', authMiddleware, tasks);

app.listen(3000, () => {
  console.log('Staring on PORT 3000');
});
