/* eslint-disable consistent-return */
/* eslint-disable func-names */
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

interface IToken {
  id: string;
  profile: string;
  iat: string;
  exp: string;
}

function verifyToken(profiles: Array<number>) {
  return function (
    req: Request,
    res: Response,
    next: () => void,
  ): Response | void {
    const privateKey = process.env.JWT_SECRET || '';

    if (!process.env.UNSAFE_MODE)
      try {
        if (
          req.headers.authorization &&
          (req.headers.authorization.split(' ')[0] === 'Token' ||
            req.headers.authorization.split(' ')[0] === 'Bearer')
        ) {
          const token = req.headers.authorization.split(' ')[1];
          const decoded = jwt.verify(token, privateKey);
          const { profile } = <IToken>decoded;

          if (profiles.includes(Number(profile))) next();
          else
            return res
              .status(401)
              .json({ auth: false, message: 'Invalid Token.' });
        } else {
          return res
            .status(401)
            .json({ auth: false, message: 'No token provided.' });
        }
      } catch (err) {
        return res.status(401).json({ auth: false, message: 'Invalid Token.' });
      }
    else next();
  };
}

export { verifyToken };
