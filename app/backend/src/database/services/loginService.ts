import * as bcrypt from 'bcryptjs';
import Users from '../models/users';
import { IUser } from '../interfaces/userInterface';
import createToken, { decoder } from '../helpers/jwtAuth';

export default class User {
  private model = Users;

  newLogin = async (email: string, password: string) => {
    const findUser = await this.model.findOne({ where: { email } }) as IUser;
    const correctPassword = bcrypt.hashSync(password, findUser.password as string);

    if (!correctPassword) {
      throw new Error('incorrect password');
    }

    if (!findUser) {
      throw new Error('incorrect email');
    }

    const token = await createToken(email, findUser.role);
    return { token };
  };

  loginValidate = async (token: string | undefined) => {
    if (typeof token === 'string') {
      const findUser = decoder(token);
      return { role: findUser };
    }
    return { error: 'Erro' };
  };
}
