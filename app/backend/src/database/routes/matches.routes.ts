import { Router } from 'express';

import MatchesController from '../controllers/matchesController';
import validTokenMiddleware from '../middlewares/validToken.middleware';
import validMatch from '../middlewares/validMatch.middleware';

const matchesRouter = Router();

const matchesController = new MatchesController();

matchesRouter.get('/', matchesController.getAllMatches);
matchesRouter.post('/', validTokenMiddleware, validMatch, matchesController.createNewMatch);
matchesRouter.patch('/:id/finish', matchesController.finishMatch);
matchesRouter.patch('/:id', matchesController.updateMatch);

export default matchesRouter;
