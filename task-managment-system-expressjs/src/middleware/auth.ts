import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import client from '../models/redis';
import { AuthenticatedRequest } from '../types';

export const authMiddleware = async (
  req: AuthenticatedRequest,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const isTokenCorrect = jwt.verify(
      req.headers.authorization.split(' ')[1],
      'secretjsonwebtoken'
    );
    const isTokenValid = await client.get(
      req.headers.authorization.split(' ')[1]
    );
    console.log(isTokenCorrect, isTokenValid);
    if (!isTokenCorrect || !isTokenValid) {
      throw new Error('Unauthorized');
    }
    req.user = JSON.parse(isTokenValid);
    next();
  } catch (error) {
    res.status(403).send({ message: error.message });
  }
};
