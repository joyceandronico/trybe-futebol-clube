import teams from '../models/teams';

export default class Team {
  private model = teams;

  getAllTeams = async () => {
    const allTeams = await this.model.findAll();

    return allTeams;
  };

  getTeamById = async (id: number | undefined) => {
    const teamById = await this.model.findOne({ where: { id } });

    return teamById;
  };
}
