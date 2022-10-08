import * as bcrypt from 'bcryptjs';
import Users from '../models/users';
import { IUser } from '../interfaces/userInterface';
import createToken from '../helpers/jwtAuth';

export default class User {
  private model = Users;

  newLogin = async (email: string, password: string) => {
    const findUser = await this.model.findOne({ where: { email } }) as IUser;
    if (!findUser) throw new Error('User validation');

    const correctPassword = bcrypt.compareSync(password, findUser.password as string);
    if (!correctPassword) throw new Error('User validation');

    const token = await createToken(email, findUser.role);
    return { token };
  };
}
