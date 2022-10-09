import { Request, Response, NextFunction } from 'express';

const userValidate = async (req: Request, _res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const regexEmail = /\S+@\S+\.\S+/;
    const emailExists = regexEmail.test(email);

    if (!emailExists) {
      throw new Error('user validation');
    }

    if (!email || !password) {
      throw new Error('no email or password');
    }

    next();
  } catch (error) {
    next(error);
  }
};

export default userValidate;
