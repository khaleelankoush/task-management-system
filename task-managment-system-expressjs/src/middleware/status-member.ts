import * as express from 'express';
import { AuthenticatedRequest } from '../types';
import Member from '../models/member-model';
import Status from '../models/status-model';

export const statusMemberMiddleware = async (
  req: AuthenticatedRequest,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    let status;
    if (req.body.status_id) {
      status = await Status.findByPk(req.body.status_id);
    } else {
      status = await Status.findByPk(req.params.id);
    }

    const member = await Member.findOne({
      where: { board_id: status.board_id, member_id: req.user.id },
    });

    if (!member) {
      throw new Error('Unauthorized');
    }
    next();
  } catch (error) {
    res.status(403).send({ message: error.message });
  }
};
