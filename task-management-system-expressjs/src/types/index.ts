import * as express from 'express';

export interface AuthenticatedRequest extends express.Request {
  user: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    username?: string;
    password: string;
  };
}
