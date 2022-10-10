import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'SECRET';

const validTokenMiddleware = (req: Request, res:Response, next:NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization) next({ message: 'Token must be a valid token' });
  try {
    if (typeof authorization === 'string') {
      jwt.verify(authorization, secret);
      next();
    }
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export default validTokenMiddleware;
