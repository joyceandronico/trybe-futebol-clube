import { IGoals } from '../interfaces/goalsInterface';

export default class ResultsService {
  public name: string;
  public totalPoints: number;
  public totalGames: number;
  public totalVictories: number;
  public totalDraws: number;
  public totalLosses: number;
  public scoredGoals: number;
  public concededGoals: number;
  public goalsBalance: number;
  public efficiency: number;

  constructor(teamName: string, matches: IGoals[]) {
    this.name = teamName;
    this.totalPoints = ResultsService.getPoints(matches);
    this.totalGames = matches.length;
    this.totalVictories = ResultsService.getVictories(matches);
    this.totalDraws = ResultsService.getDraws(matches);
    this.totalLosses = ResultsService.getLosses(matches);
    this.scoredGoals = ResultsService.getGoalsFavor(matches);
    this.concededGoals = ResultsService.getGoalsOwn(matches);
    this.goalsBalance = this.scoredGoals - this.concededGoals;
    this.efficiency = ResultsService.getEfficiency(this.totalGames, this.totalPoints);
  }

  private static getPoints = (matches: IGoals[]): number => {
    let totalPoints = 0;
    matches.forEach((match) => {
      if (match.scoredGoals > match.concededGoals) totalPoints += 3;
      if (match.scoredGoals === match.concededGoals) totalPoints += 1;
    });
    return totalPoints;
  };

  private static getVictories(matches: IGoals[]): number {
    let totalVictories = 0;
    matches.forEach((match) => {
      if (match.scoredGoals > match.concededGoals) totalVictories += 1;
    });
    return totalVictories;
  }

  private static getDraws(matches: IGoals[]): number {
    let totalDraws = 0;
    matches.forEach((match) => {
      if (match.scoredGoals === match.concededGoals) totalDraws += 1;
    });
    return totalDraws;
  }

  private static getLosses(matches: IGoals[]): number {
    let totalLosses = 0;
    matches.forEach((match) => {
      if (match.scoredGoals < match.concededGoals) totalLosses += 1;
    });
    return totalLosses;
  }

  private static getGoalsFavor(matches: IGoals[]): number {
    let totalGoalsFavor = 0;
    matches.forEach((match) => { totalGoalsFavor += match.scoredGoals; });
    return totalGoalsFavor;
  }

  private static getGoalsOwn(matches: IGoals[]): number {
    let totalGoalsOwn = 0;
    matches.forEach((match) => { totalGoalsOwn += match.concededGoals; });
    return totalGoalsOwn;
  }

  private static getEfficiency(games: number, points: number) {
    const efficient = (points * 100) / (games * 3);
    return Number(efficient.toFixed(2));
  }
}
