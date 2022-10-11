import { NextFunction, Request, Response } from 'express';
import leaderboardService from '../services/leaderboardService';

export default class leaderboardController {
  static getHomeTeams = async (_req:Request, res: Response, next:NextFunction) => {
    try {
      const teams = await leaderboardService.getHomeTeams();
      return res.status(200).json(teams.leaderboard);
    } catch (error) {
      next(error);
    }
  };

  static getAwayTeams = async (_req:Request, res: Response, next:NextFunction) => {
    try {
      const teams = await leaderboardService.getAwayTeams();
      return res.status(200).json(teams.leaderboard);
    } catch (error) {
      next(error);
    }
  };
}
