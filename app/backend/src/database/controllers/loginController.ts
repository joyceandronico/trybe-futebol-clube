import { Request, Response, NextFunction } from 'express';
import NewLogin from '../services/loginService';

export default class Controller {
  private service = new NewLogin();

  newLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const user = await this.service.newLogin(email, password);
      return res.status(201).json(user);
    } catch (error) {
      return next(error);
    }
  };
}
