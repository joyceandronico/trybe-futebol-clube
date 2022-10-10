import { Router } from 'express';

import MatchesController from '../controllers/matchesController';
import validTokenMiddleware from '../middlewares/validToken.middleware';

const matchesRouter = Router();

const matchesController = new MatchesController();

matchesRouter.get('/', matchesController.getAllMatches);
matchesRouter.post('/', validTokenMiddleware, matchesController.createNewMatch);
matchesRouter.patch('/:id/finish', matchesController.finishMatch);

export default matchesRouter;
