import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import * as redis from 'redis';

import User from '../../models/user-model';
import client from '../../models/redis';

export const register = async (req: express.Request, res: express.Response) => {
  try {
    let user = await User.create({
      ...req.body,
      password: bcrypt.hashSync(req.body.password, 12),
    });
    user.password = undefined;
    return res.send(user);
  } catch (error) {
    console.log(error);

    res.status(400).send({ message: error.message });
  }
};

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!user || !bcrypt.compare(req.body.password, user.password)) {
      throw new Error('Wrong username or password');
    }
    user.password = undefined;
    const token = jwt.sign({ ...user }, 'secretjsonwebtoken');
    client.set(token, JSON.stringify(user));
    return res.send({
      user,
      token,
    });
  } catch (error) {
    res.status(401).send({ message: error.message });
  }
};

export const logout = async (req: express.Request, res: express.Response) => {
  try {
    await client.del(req.headers.authorization.split(' ')[1]);
    return res.send(req.query.user);
  } catch (error) {
    res.status(403).send({ message: 'Unauthorized' });
  }
};
