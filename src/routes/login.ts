import { Router } from 'express';
import type { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

import { hash } from '../utils/hash';
import User from '../database/models/user';

import type {
  TokenPayload,
  ErrorResponseBody,
  LoginRequestBody,
  LoginResponseBody
} from './t';

const loginRouter = Router();

loginRouter.post(
  '/',
  async (
    req: Request<{}, {}, LoginRequestBody>,
    res: Response<LoginResponseBody>
  ) => {
    const username = req.body.username;

    const plainPassword = req.body.password;
    const hashedPassword = hash(plainPassword);

    const user = await User.findOne({
      where: {
        username
      }
    });

    if (user === null) {
      res.json({
        status: 'error',
        error: {
          field: 'username',
          message: `No user found by username ${username}`
        }
      });

      return;
    }

    if (user.hashedPassword !== hashedPassword) {
      res.json({
        status: 'error',
        error: {
          field: 'password',
          message: `Incorrect password`
        }
      });

      return;
    }

    const token = jwt.sign(
      {
        userId: user.id
      },
      process.env.JWT_KEY,
      {
        algorithm: 'HS512',
        expiresIn: '7d'
      }
    );

    res.json({
      status: 'success',
      user,
      token
    });
  }
);

export default loginRouter;
