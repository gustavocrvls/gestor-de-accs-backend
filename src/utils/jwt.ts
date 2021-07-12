import { Request } from 'express';
import jwt from 'jsonwebtoken';

export interface IToken {
  id: string;
  profile: string;
  iat: string;
  exp: string;
}

export function getTokenFieldsFromRequest(req: Request): IToken | null {
  const privateKey = process.env.JWT_SECRET || '';

  if (
    req.headers.authorization &&
    (req.headers.authorization.split(' ')[0] === 'Token' ||
      req.headers.authorization.split(' ')[0] === 'Bearer') &&
    req.headers.authorization.split(' ')[1]
  ) {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, privateKey) as IToken;

    return decoded;
  }

  throw new Error('Token not provided!');
}