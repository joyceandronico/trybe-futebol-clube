import { Model, DataTypes } from 'sequelize';
import db from '.';

class teams extends Model {
  id: number;
  teamName: string;
}
teams.init({
  teamName: DataTypes.STRING,

}, {
  sequelize: db,
  underscored: true,
  modelName: 'teams',
  timestamps: false,
});

export default teams;
