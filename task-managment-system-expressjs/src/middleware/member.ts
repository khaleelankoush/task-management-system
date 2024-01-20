import * as express from 'express';
import { AuthenticatedRequest } from '../types';
import Member from '../models/member-model';
import Board from '../models/board-model';

export const memberMiddleware = async (
  req: AuthenticatedRequest,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    if (req.query.board_id) {
      const member = await Member.findOne({
        where: { member_id: req.user.id, board_id: req.query.board_id },
      });
      if (!member) {
        throw new Error('Unauthorized');
      }
    }

    if (req.body.board_id) {
      const board = await Board.findOne({
        where: { owner_user_id: req.user.id, id: req.body.board_id },
      });
      if (!board) {
        throw new Error('Unauthorized');
      }
    }
    next();
  } catch (error) {
    res.status(403).send({ message: error.message });
  }
};
