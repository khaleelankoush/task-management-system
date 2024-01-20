import * as express from 'express';
import Status from '../../models/status-model';
import Board from '../../models/board-model';
import { AuthenticatedRequest } from '../../types';
import { where } from 'sequelize';

export const getAll = async (
  req: AuthenticatedRequest,
  res: express.Response
) => {
  try {
    return res.send(
      await Status.findAll({ where: { board_id: req.query.board_id } })
    );
  } catch (error) {
    res.status(400).send({ message: 'Something went wrong!' });
  }
};

export const get = async (req: AuthenticatedRequest, res: express.Response) => {
  try {
    return res.send(await Status.findByPk(req.params.id));
  } catch (error) {
    res.status(400).send({ message: 'Something went wrong!' });
  }
};

export const create = async (
  req: AuthenticatedRequest,
  res: express.Response
) => {
  try {
    return res.send(await Status.create({ ...req.body }));
  } catch (error) {
    res.status(400).send({ message: 'Something went wrong!' });
  }
};

const checkUserID = async (status_id: number, user_id: number) => {
  const status = await Status.findByPk(status_id);
  const board = await Board.findByPk(status.board_id);
  if (board.owner_user_id !== user_id) {
    throw new Error('Unauthorized');
  }
};

export const update = async (
  req: AuthenticatedRequest,
  res: express.Response
) => {
  try {
    checkUserID(+req.params.id, +req.user.id);
    return res.send(
      await Status.update({ ...req.body }, { where: { id: req.params.id } })
    );
  } catch (error) {
    res.status(400).send({ message: 'Something went wrong!' });
  }
};

export const remove = async (
  req: AuthenticatedRequest,
  res: express.Response
) => {
  try {
    checkUserID(+req.params.id, +req.user.id);
    return res.send(await Status.destroy({ where: { id: req.params.id } }));
  } catch (error) {
    res.status(400).send({ message: 'Something went wrong!' });
  }
};
