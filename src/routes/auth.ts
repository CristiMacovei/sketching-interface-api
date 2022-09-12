import { Router } from 'express';
import type { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

import type {
  TokenPayload,
  ErrorResponseBody,
  AuthRequestBody,
  AuthResponseBody
} from './t';

import User from '../database/models/user';
import Sketch from '../database/models/sketch';

const authRouter = Router();

authRouter.post(
  '/',
  async (
    req: Request<{}, {}, AuthRequestBody>,
    res: Response<AuthResponseBody>
  ) => {
    const token = req.body.token;

    try {
      const decodedToken = jwt.verify(token, process.env.JWT_KEY, {
        algorithms: ['HS256', 'HS512']
      }) as TokenPayload;

      const user = await User.findByPk(decodedToken.userId, {
        include: [
          {
            model: Sketch,
            as: 'sketches'
          }
        ]
      });

      res.json({
        status: 'success',
        user
      });
    } catch (e) {
      res.json({
        status: 'error',
        error: {
          message: e.message
        }
      });
    }
  }
);

export default authRouter;
