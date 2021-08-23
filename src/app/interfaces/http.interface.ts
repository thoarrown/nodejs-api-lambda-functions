import { IUser } from './user.interface';
import { Request } from 'express';

export interface IRequest extends Request {
  user?: IUser;
  body: any;
  query: any;
  language: string;
}
