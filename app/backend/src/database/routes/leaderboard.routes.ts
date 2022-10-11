import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboardController';

const leaderboardRouter = Router();

leaderboardRouter.get('/home', LeaderboardController.getHomeTeams);
leaderboardRouter.get('/away', LeaderboardController.getAwayTeams);

export default leaderboardRouter;
