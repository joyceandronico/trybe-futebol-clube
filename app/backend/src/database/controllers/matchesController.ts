import { Request, Response, NextFunction } from 'express';
import MatchesService from '../services/matchesService';

export default class Match {
  private service = new MatchesService();

  getAllMatches = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const match = await this.service.getAllMatches();
      return res.status(200).json(match);
    } catch (error) {
      next(error);
    }
  };

  createNewMatch = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const match = await this.service.createNewMatch(req.body);
      return res.status(201).json(match);
    } catch (error) {
      next(error);
    }
  };

  finishMatch = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const response = await this.service.finishMatch(Number(id));
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };
}
