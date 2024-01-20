import * as express from 'express';
import { AuthenticatedRequest } from '../types';
import Member from '../models/member-model';
import Board from '../models/board-model';

export const ownerMiddleware = async (
  req: AuthenticatedRequest,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const member = await Member.findByPk(req.params.id);

    const board = await Board.findByPk(member.board_id);

    if (board.owner_user_id !== req.user.id) {
      throw new Error('Unauthorized');
    }
    next();
  } catch (error) {
    res.status(403).send({ message: error.message });
  }
};
