import { Model, DataTypes } from 'sequelize';
import db from '.';
import teams from './teams';

class matches extends Model {
  id: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
}
matches.init({
  homeTeam: DataTypes.INTEGER,
  homeTeamGoals: DataTypes.INTEGER,
  awayTeam: DataTypes.INTEGER,
  awayTeamGoals: DataTypes.INTEGER,
  inProgress: DataTypes.BOOLEAN,

}, {
  sequelize: db,
  underscored: true,
  modelName: 'matches',
  timestamps: false,
});

matches.belongsTo(teams, { foreignKey: 'homeTeam', as: 'teamHome' });
matches.belongsTo(teams, { foreignKey: 'awayTeam', as: 'teamAway' });
teams.hasMany(matches, { foreignKey: 'homeTeam', as: 'teamHome' });
teams.hasMany(matches, { foreignKey: 'awayTeam', as: 'teamAway' });

export default matches;
