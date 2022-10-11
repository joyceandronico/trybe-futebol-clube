import { IGoals } from '../interfaces/goalsInterface';

export default class ResultsService {
  public name: string;
  public totalPoints: number;
  public totalGames: number;
  public totalVictories: number;
  public totalDraws: number;
  public totalLosses: number;
  public goalsFavor: number;
  public goalsOwn: number;
  public goalsBalance: number;
  public efficiency: number;

  constructor(teamName: string, matches: IGoals[]) {
    this.name = teamName;
    this.totalPoints = ResultsService.getPoints(matches);
    this.totalGames = matches.length;
    this.totalVictories = ResultsService.getVictories(matches);
    this.totalDraws = ResultsService.getDraws(matches);
    this.totalLosses = ResultsService.getLosses(matches);
    this.goalsFavor = ResultsService.getGoalsFavor(matches);
    this.goalsOwn = ResultsService.getGoalsOwn(matches);
    this.goalsBalance = this.goalsFavor - this.goalsOwn;
    this.efficiency = ResultsService.getEfficiency(this.totalGames, this.totalPoints);
  }

  private static getPoints = (matches: IGoals[]): number => {
    let totalPoints = 0;
    matches.forEach((match) => {
      if (match.goalsFavor > match.goalsOwn) totalPoints += 3;
      if (match.goalsFavor === match.goalsOwn) totalPoints += 1;
    });
    return totalPoints;
  };

  private static getVictories(matches: IGoals[]): number {
    let totalVictories = 0;
    matches.forEach((match) => {
      if (match.goalsFavor > match.goalsOwn) totalVictories += 1;
    });
    return totalVictories;
  }

  private static getDraws(matches: IGoals[]): number {
    let totalDraws = 0;
    matches.forEach((match) => {
      if (match.goalsFavor === match.goalsOwn) totalDraws += 1;
    });
    return totalDraws;
  }

  private static getLosses(matches: IGoals[]): number {
    let totalLosses = 0;
    matches.forEach((match) => {
      if (match.goalsFavor < match.goalsOwn) totalLosses += 1;
    });
    return totalLosses;
  }

  private static getGoalsFavor(matches: IGoals[]): number {
    let totalGoalsFavor = 0;
    matches.forEach((match) => { totalGoalsFavor += match.goalsFavor; });
    return totalGoalsFavor;
  }

  private static getGoalsOwn(matches: IGoals[]): number {
    let totalGoalsOwn = 0;
    matches.forEach((match) => { totalGoalsOwn += match.goalsOwn; });
    return totalGoalsOwn;
  }

  private static getEfficiency(games: number, points: number) {
    const efficient = (points * 100) / (games * 3);
    return Number(efficient.toFixed(2));
  }
}
