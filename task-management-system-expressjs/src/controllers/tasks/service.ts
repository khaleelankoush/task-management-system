import * as express from 'express';
import Task from '../../models/task-model';
import { AuthenticatedRequest } from '../../types';

export const getAll = async (
  req: AuthenticatedRequest,
  res: express.Response
) => {
  try {
    return res.send(await Task.findAll());
  } catch (error) {
    res.status(400).send({ message: 'Something went wrong!' });
  }
};

export const get = async (req: AuthenticatedRequest, res: express.Response) => {
  try {
    return res.send(await Task.findByPk(req.params.id));
  } catch (error) {
    res.status(400).send({ message: 'Something went wrong!' });
  }
};

export const create = async (
  req: AuthenticatedRequest,
  res: express.Response
) => {
  try {
    return res.send(await Task.create({ ...req.body }));
  } catch (error) {
    res.status(400).send({ message: 'Something went wrong!' });
  }
};

export const update = async (
  req: AuthenticatedRequest,
  res: express.Response
) => {
  try {
    return res.send(
      await Task.update({ ...req.body }, { where: { id: req.params.id } })
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
    return res.send(await Task.destroy({ where: { id: req.params.id } }));
  } catch (error) {
    res.status(400).send({ message: 'Something went wrong!' });
  }
};
