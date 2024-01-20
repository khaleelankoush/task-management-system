import * as express from 'express';
import { AuthenticatedRequest } from '../types';
import Member from '../models/member-model';

export const boardMemberMiddleware = async (
  req: AuthenticatedRequest,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const member = await Member.findOne({
      where: { board_id: req.params.id, member_id: req.user.id },
    });

    if (!member) {
      throw new Error('Unauthorized');
    }
    next();
  } catch (error) {
    res.status(403).send({ message: error.message });
  }
};
