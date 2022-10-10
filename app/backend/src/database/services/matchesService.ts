import matches from '../models/matches';
import { IMatch } from '../interfaces/matchInterface';

export default class Matches {
  private model = matches;

  getAllMatches = async () => {
    const findAllMatches = await this.model.findAll({ include: ['teamHome', 'teamAway'] });
    return findAllMatches;
  };

  createNewMatch = async (data: IMatch): Promise<IMatch> => {
    const findMatch = await this.model.create({ ...data, inProgress: true });
    return findMatch;
  };
}
