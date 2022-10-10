import matches from '../models/matches';
import teams from '../models/teams';
import { IMatch } from '../interfaces/matchInterface';

export default class Matches {
  private model = matches;
  private team = teams;

  getAllMatches = async () => {
    const findAllMatches = await this.model.findAll({ include: ['teamHome', 'teamAway'] });
    return findAllMatches;
  };

  createNewMatch = async (data: IMatch): Promise<IMatch> => {
    const { homeTeam, awayTeam } = data;
    const home = await this.team.findOne({ where: { id: homeTeam } });
    const away = await this.team.findOne({ where: { id: awayTeam } });
    if (!home || !away) {
      throw new Error('There is no team with such id!');
    }
    const createdMatch = await this.model.create({ ...data, inProgress: true });
    return createdMatch;
  };

  finishMatch = async (id: number): Promise<object> => {
    await this.model.update({ inProgress: false }, { where: { id } });
    return { message: 'Finished' };
  };
}
