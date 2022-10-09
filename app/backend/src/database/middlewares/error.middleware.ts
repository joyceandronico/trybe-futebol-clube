import { Request, Response, NextFunction } from 'express';

const errorMiddleware = (error: Error, _req: Request, res: Response, _next: NextFunction) => {
  const { message } = error;
  switch (message) {
    case 'no email or password': {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    case 'user validation': {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }

    default: {
      console.log({ error: message });
      return res.status(500).json(message);
    }
  }
};

export default errorMiddleware;
