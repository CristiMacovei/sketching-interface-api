import { Router } from 'express';
import type { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

import type {
  TokenPayload,
  ErrorResponseBody,
  SketchListRequestBody,
  SketchListResponseBody,
  SketchCreateRequestBody,
  SketchCreateResponseBody,
  SketchUpdateRequestBody,
  SketchUpdateResponseBody,
  SketchDeleteRequestBody,
  SketchDeleteResponseBody
} from './t';

import User from '../database/models/user';
import Sketch from '../database/models/sketch';

const sketchRouter = Router();

async function getUserFromToken(token: string): Promise<User | null> {
  let userId = null;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_KEY, {
      algorithms: ['HS256', 'HS512']
    }) as TokenPayload;

    userId = decodedToken.userId;
  } catch (e) {
    return null;
  }

  console.log(userId);

  const user = await User.findByPk(userId, {
    include: [
      {
        model: Sketch,
        as: 'sketches'
      }
    ]
  });

  console.log(user);

  if (!user) {
    return null;
  }

  return user;
}

sketchRouter.get(
  '/list',
  async (
    req: Request<{}, {}, {}, SketchListRequestBody>,
    res: Response<SketchListResponseBody>
  ) => {
    const token = req.query.token;

    const user = await getUserFromToken(token);

    if (!user) {
      res.json({
        status: 'error',
        error: {
          message: 'Invalid token'
        }
      });

      return;
    }

    const sketches = user.sketches;
    res.json({
      status: 'success',
      sketches
    });
  }
);

sketchRouter.post(
  '/create',
  async (
    req: Request<{}, {}, SketchCreateRequestBody>,
    res: Response<SketchCreateResponseBody>
  ) => {
    const token = req.body.token;
    const user = await getUserFromToken(token);

    if (!user) {
      res.json({
        status: 'error',
        error: {
          message: 'Invalid token'
        }
      });
    }

    const sketchData = req.body.data;

    const newSketch = await Sketch.create({
      json: sketchData.json,
      ownerId: user.id
    });

    await newSketch.save();

    res.json({
      status: 'success',
      sketch: newSketch
    });
  }
);

sketchRouter.post(
  '/update',
  async (
    req: Request<{}, {}, SketchUpdateRequestBody>,
    res: Response<SketchUpdateResponseBody>
  ) => {
    const token = req.body.token;

    const user = await getUserFromToken(token);

    if (!user) {
      res.json({
        status: 'error',
        error: {
          message: 'Invalid token'
        }
      });

      return;
    }

    const sketchData = req.body.data;
    const sketchId = req.body.sketchId;

    const sketch = await Sketch.findByPk(sketchId, {
      include: {
        model: User,
        as: 'owner'
      }
    });

    if (!sketch) {
      res.json({
        status: 'error',
        error: {
          message: 'Sketch not found'
        }
      });

      return;
    }

    if (sketch.ownerId !== user.id) {
      res.json({
        status: 'error',
        error: {
          message: 'You do not have permission to update this sketch'
        }
      });

      return;
    }

    try {
      await sketch.update(sketchData);

      res.json({
        status: 'success',
        sketch
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

sketchRouter.post(
  '/delete',
  async (
    req: Request<{}, {}, SketchDeleteRequestBody>,
    res: Response<SketchDeleteResponseBody>
  ) => {
    const token = req.body.token;

    const user = await getUserFromToken(token);

    if (!user) {
      res.json({
        status: 'error',
        error: {
          message: 'Invalid token'
        }
      });

      return;
    }

    const sketchId = req.body.sketchId;
    const sketch = await Sketch.findByPk(sketchId, {
      include: {
        model: User,
        as: 'owner'
      }
    });

    if (!sketch) {
      res.json({
        status: 'error',
        error: {
          message: 'Sketch not found'
        }
      });

      return;
    }

    if (sketch.ownerId !== user.id) {
      res.json({
        status: 'error',
        error: {
          message: 'You do not have permission to delete this sketch'
        }
      });

      return;
    }

    try {
      await sketch.destroy();

      res.json({
        status: 'success'
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

export default sketchRouter;
