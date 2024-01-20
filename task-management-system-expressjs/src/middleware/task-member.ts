import * as express from 'express';
import { AuthenticatedRequest } from '../types';
import Member from '../models/member-model';
import Status from '../models/status-model';
import Task from '../models/task-model';

export const taskMemberMiddleware = async (
  req: AuthenticatedRequest,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const task = await Task.findByPk(req.params.id);

    const status = await Status.findByPk(task.status_id);
    let member;
    if (req.body.board_id) {
      member = await Member.findOne({
        where: { board_id: req.body.board_id, member_id: req.user.id },
      });
    } else {
      member = await Member.findOne({
        where: { board_id: status.board_id, member_id: req.user.id },
      });
    }

    if (!member) {
      throw new Error('Unauthorized');
    }
    next();
  } catch (error) {
    res.status(403).send({ message: error.message });
  }
};
