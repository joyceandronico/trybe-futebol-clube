import { Model, DataTypes } from 'sequelize';
import db from '.';
import teams from './teams';

class Matches extends Model {
  id: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
}
Matches.init({
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

Matches.belongsTo(teams, { foreignKey: 'homeTeam', as: 'teamHome' });
Matches.belongsTo(teams, { foreignKey: 'awayTeam', as: 'teamAway' });
teams.hasMany(Matches, { foreignKey: 'homeTeam', as: 'teamHome' });
teams.hasMany(Matches, { foreignKey: 'awayTeam', as: 'teamAway' });

export default Matches;
