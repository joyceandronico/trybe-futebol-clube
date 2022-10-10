import { Router } from 'express';
import TeamController from '../controllers/teamsController';

const teamsRouter = Router();
const teamController = new TeamController();

teamsRouter.get('/', teamController.getAllTeams);
teamsRouter.get('/:id', teamController.getTeamById);

export default teamsRouter;
