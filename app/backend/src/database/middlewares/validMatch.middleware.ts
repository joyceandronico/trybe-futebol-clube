import { Request, Response, NextFunction } from 'express';

const validMatch = (req: Request, res: Response, next: NextFunction) => {
  const { homeTeam, awayTeam } = req.body;

  if (homeTeam === awayTeam) {
    return res.status(401)
      .json({ message: 'It is not possible to create a match with two equal teams' });
  }

  next();
};

export default validMatch;
