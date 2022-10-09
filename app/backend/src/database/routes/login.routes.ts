import { Router } from 'express';
import userValidate from '../middlewares/validateUser.middleware';
import LoginController from '../controllers/loginController';

const loginRouter = Router();

const controller = new LoginController();

loginRouter.post('/', userValidate, controller.newLogin);
loginRouter.get('/validate', controller.loginValidate);

export default loginRouter;
