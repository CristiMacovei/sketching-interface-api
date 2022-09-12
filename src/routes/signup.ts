import { Router } from 'express';
import type { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

import { hash } from '../utils/hash';
import User from '../database/models/user';

import type {
  TokenPayload,
  ErrorResponseBody,
  SignupRequestBody,
  SignupResponseBody
} from './t';

const signupRouter = Router();

signupRouter.post(
  '/',
  async (
    req: Request<{}, {}, SignupRequestBody>,
    res: Response<SignupResponseBody>
  ) => {
    const username = req.body.username;

    const plainPassword = req.body.password;
    const hashedPassword = hash(plainPassword);

    const user = await User.findOne({
      where: {
        username
      }
    });

    if (user !== null) {
      res.json({
        status: 'error',
        error: {
          message: `Username already existing: ${username}`
        }
      });

      return;
    }

    try {
      const newUser = await User.create({
        username,
        hashedPassword
      });

      await newUser.save();

      const token = jwt.sign(
        {
          userId: newUser.id
        },
        process.env.JWT_KEY,
        {
          algorithm: 'HS512',
          expiresIn: '7d'
        }
      );

      res.json({
        status: 'success',
        user: newUser,
        token
      });
    } catch (e) {
      console.log(`Error when saving user: ${e.message}`);

      res.json({
        status: 'error',
        error: {
          message: `Error when saving user: ${e.message}`
        }
      });
    }
  }
);

export default signupRouter;
