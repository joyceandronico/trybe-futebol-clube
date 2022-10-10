import { Request, Response, NextFunction } from 'express';
import TeamService from '../services/teamService';

export default class TeamController {
  private service = new TeamService();

  getAllTeams = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const team = await this.service.getAllTeams();
      return res.status(200).json(team);
    } catch (error) {
      return next(error);
    }
  };

  getTeamById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const team = await this.service.getTeamById(Number(id));
      return res.status(200).json(team);
    } catch (error) {
      return next(error);
    }
  };
}
