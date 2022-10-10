import matches from '../models/matches';

export default class Matches {
  private model = matches;

  getAllMatches = async () => {
    const findAllMatches = await this.model.findAll({ include: ['teamHome', 'teamAway'] });

    return findAllMatches;
  };
}
