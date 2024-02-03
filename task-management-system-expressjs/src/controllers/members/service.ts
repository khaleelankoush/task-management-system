import * as express from 'express';
import Member from '../../models/member-model';
import { AuthenticatedRequest } from '../../types';

export const getAll = async (
  req: AuthenticatedRequest,
  res: express.Response
) => {
  try {
    return res.send(
      await Member.findAll({ where: { board_id: req.query.board_id } })
    );
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

export const get = async (req: AuthenticatedRequest, res: express.Response) => {
  try {
    return res.send(await Member.findByPk(req.params.id));
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

export const create = async (
  req: AuthenticatedRequest,
  res: express.Response
) => {
  try {
    return res.send(await Member.create({ ...req.body }));
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

export const update = async (
  req: AuthenticatedRequest,
  res: express.Response
) => {
  try {
    return res.send(
      await Member.update({ ...req.body }, { where: { id: req.params.id } })
    );
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

export const remove = async (
  req: AuthenticatedRequest,
  res: express.Response
) => {
  try {
    return res.send(await Member.destroy({ where: { id: req.params.id } }));
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};
