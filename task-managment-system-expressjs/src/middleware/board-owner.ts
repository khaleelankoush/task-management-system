import * as express from 'express';
import { AuthenticatedRequest } from '../types';
import Board from '../models/board-model';

export const boardOwnerMiddleware = async (
  req: AuthenticatedRequest,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const board = await Board.findOne({
      where: { id: req.params.id, owner_user_id: req.user.id },
    });

    if (!board) {
      throw new Error('Unauthorized');
    }
    next();
  } catch (error) {
    res.status(403).send({ message: error.message });
  }
};
