import express from 'express';
import cors from 'cors';
import { config as envConfig } from 'dotenv';

import loginRouter from './routes/login';
import signupRouter from './routes/signup';
import authRouter from './routes/auth';
import sketchesRouter from './routes/sketches';

import { init as dbInit } from './database/connection';

const app = express();
app.use(express.json());
app.use(cors());

async function main() {
  envConfig();

  await dbInit();

  app.listen(7181, () => {
    console.log(`Server started`);
  });
}

app.use('/login', loginRouter);

app.use('/signup', signupRouter);

app.use('/auth', authRouter);

app.use('/sketches', sketchesRouter);

main();
