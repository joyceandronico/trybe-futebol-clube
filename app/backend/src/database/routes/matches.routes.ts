import { Router } from 'express';

import MatchesController from '../controllers/matchesController';

const matchesRouter = Router();

const matchesController = new MatchesController();

matchesRouter.get('/', matchesController.getAllMatches);

export default matchesRouter;
