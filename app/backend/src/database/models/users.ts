import { Model, DataTypes } from 'sequelize';
import db from '.';

class Users extends Model {
  id: number;
  username: string;
  role: string;
  email: string;
  password: string;
}
Users.init({
  username: DataTypes.STRING,
  role: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,

}, {
  sequelize: db,
  underscored: true,
  modelName: 'users',
  timestamps: false,
});
export default Users;
