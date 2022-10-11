import matches from '../models/matches';
import teams from '../models/teams';
import ResultsService from './resultsService';

export default class LeaderboardService {
  public static async getHomeTeams() {
    const teamsData = await this.getTeamsData();
    const matchesData = await this.getMatchesData();
    const homeGames: ResultsService[] = [];

    teamsData.forEach((team) => {
      const filteredMatches = matchesData
        .filter(
          (filteredMatch) => filteredMatch.inProgress === false
          && filteredMatch.homeTeam === team.id,
        );
      const mappedMatches = filteredMatches
        .map((mappedMatch) => ({
          goalsFavor: mappedMatch.homeTeamGoals,
          goalsOwn: mappedMatch.awayTeamGoals,
        }));

      const teamResults = new ResultsService(team.teamName, mappedMatches);
      homeGames.push(teamResults);
    });

    return { code: 200, leaderboard: this.compareTeams(homeGames) };
  }

  private static getTeamsData = async () => {
    const allTeams = await teams.findAll();
    return allTeams;
  };

  private static getMatchesData = async () => {
    const allMatches = await matches.findAll();
    return allMatches;
  };

  private static compareTeams = (teamsData: ResultsService[]) => teamsData.sort((a, b) => {
    if (a.totalPoints < b.totalPoints) return 1;
    if (a.totalPoints > b.totalPoints) return -1;
    if (a.goalsBalance < b.goalsBalance) return 1;
    if (a.goalsBalance > b.goalsBalance) return -1;
    if (a.goalsFavor < b.goalsFavor) return 1;
    if (a.goalsFavor > b.goalsFavor) return -1;
    return 0;
  });

  public static async getAwayTeams() {
    const teamsAwayData = await this.getTeamsData();
    const matchesData = await this.getMatchesData();
    const awayGames: ResultsService[] = [];

    teamsAwayData.forEach((teamAway) => {
      const filteredMatches = matchesData
        .filter(
          (filteredMatch) => filteredMatch.inProgress === false
          && filteredMatch.awayTeam === teamAway.id,
        );
      const mappedMatches = filteredMatches
        .map((mappedMatch) => ({
          goalsOwn: mappedMatch.homeTeamGoals,
          goalsFavor: mappedMatch.awayTeamGoals,
        }));

      const teamResults = new ResultsService(teamAway.teamName, mappedMatches);
      awayGames.push(teamResults);
    });

    return { code: 200, leaderboard: this.compareTeams(awayGames) };
  }
}
