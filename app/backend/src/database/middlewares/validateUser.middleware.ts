import { Request, Response, NextFunction } from 'express';

const userValidate = async (req: Request, _res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const regexEmail = /\S+@\S+\.\S+/;
    const validEmail = regexEmail.test(email);
    const invalidPassword = password.lenght < 6;

    if (!email || !password) {
      throw new Error('no email or password');
    }

    if (!validEmail || invalidPassword) {
      throw new Error('user validation');
    }

    next();
  } catch (error) {
    next(error);
  }
};

export default userValidate;
