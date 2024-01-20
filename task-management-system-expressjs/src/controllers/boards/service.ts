import * as express from 'express';
import Board from '../../models/board-model';
import { AuthenticatedRequest } from '../../types';
import Member from '../../models/member-model';
import { Op } from 'sequelize';

export const getAll = async (
  req: AuthenticatedRequest,
  res: express.Response
) => {
  try {
    const member = await Member.findAll({ where: { member_id: req.user.id } });

    return res.send(
      await Board.findAll({
        where: {
          id: {
            [Op.in]: member.map((item: any) => {
              return item.board_id;
            }),
          },
        },
      })
    );
  } catch (error) {
    res.status(400).send({ message: 'Something went wrong!' });
  }
};

export const get = async (req: AuthenticatedRequest, res: express.Response) => {
  try {
    return res.send(await Board.findByPk(req.params.id));
  } catch (error) {
    res.status(400).send({ message: 'Something went wrong!' });
  }
};

export const create = async (
  req: AuthenticatedRequest,
  res: express.Response
) => {
  try {
    const board = await Board.create({
      ...req.body,
      owner_user_id: req.user.id,
    });
    await Member.create({
      member_id: board.owner_user_id,
      board_id: board.id,
    });
    return res.send(board);
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
      await Board.update(
        { ...req.body },
        { where: { id: req.params.id, owner_user_id: req.user.id } }
      )
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
    return res.send(
      await Board.destroy({
        where: { id: req.params.id, owner_user_id: req.user.id },
      })
    );
  } catch (error) {
    res.status(400).send({ message: 'Something went wrong!' });
  }
};
