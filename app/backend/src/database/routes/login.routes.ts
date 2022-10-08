import { Router } from 'express';
import LoginController from '../controllers/loginController';

const loginRouter = Router();

const controller = new LoginController();

loginRouter.post('/', controller.newLogin);

export default loginRouter;
