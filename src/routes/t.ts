import Sketch, { SketchInput } from '../database/models/sketch';
import User from '../database/models/user';

// jwt token payload
export type TokenPayload = {
  userId: number;
};

// general error response body
export type ErrorResponseBody = {
  status: 'error';
  error: {
    field?: string;
    message: string;
  };
};

// login
export type LoginRequestBody = {
  username: string;
  password: string;
};

export type LoginSuccessResponseBody = {
  status: 'success';
  user: User;
  token: string;
};

export type LoginResponseBody = ErrorResponseBody | LoginSuccessResponseBody;

// signup
export type SignupRequestBody = {
  username: string;
  password: string;
};

export type SignupSuccessResponseBody = {
  status: 'success';
  user: User;
  token: string;
};

export type SignupResponseBody = ErrorResponseBody | SignupSuccessResponseBody;

// auth
export type AuthRequestBody = {
  token: string;
};

export type AuthSuccessResponseBody = {
  status: 'success';
  user: User;
};

export type AuthResponseBody = ErrorResponseBody | AuthSuccessResponseBody;

// sketch list
export type SketchListRequestBody = {
  token: string;
};

export type SketchListSuccessResponseBody = {
  status: 'success';
  sketches: Sketch[];
};

export type SketchListResponseBody =
  | ErrorResponseBody
  | SketchListSuccessResponseBody;

// sketch create
export type SketchCreateRequestBody = {
  token: string;
  data: Omit<SketchInput, 'userId'>;
};

export type SketchCreateSuccessResponseBody = {
  status: 'success';
  sketch: Sketch;
};

export type SketchCreateResponseBody =
  | ErrorResponseBody
  | SketchCreateSuccessResponseBody;

// sketch update
export type SketchUpdateRequestBody = {
  token: string;
  sketchId: number;
  data: Partial<SketchInput>;
};

export type SketchUpdateSuccessResponseBody = {
  status: 'success';
  sketch: Sketch;
};

export type SketchUpdateResponseBody =
  | ErrorResponseBody
  | SketchUpdateSuccessResponseBody;

// sketch delete
export type SketchDeleteRequestBody = {
  token: string;
  sketchId: number;
};

export type SketchDeleteSuccessResponseBody = {
  status: 'success';
};

export type SketchDeleteResponseBody =
  | ErrorResponseBody
  | SketchDeleteSuccessResponseBody;
