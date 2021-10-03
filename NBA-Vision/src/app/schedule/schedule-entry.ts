export class ScheduleEntry {
  public homeTeamName: string;
  public awayTeamName: string;
  public live: boolean;
  public scheduled: boolean;
  public scheduledTime?: string;
  public homeTeamScore?: number;
  public awayTeamScore?: number;

  constructor(homeTeamName: string,
              awayTeamName: string,
              live: boolean,
              scheduled: boolean,
              scheduledTime?: string,
              homeTeamScore?: number,
              awayTeamScore?: number) {
    this.homeTeamName = homeTeamName;
    this.awayTeamName = awayTeamName;
    this.live = live;
    this.scheduled = scheduled;
    this.scheduledTime = scheduledTime;
    this.homeTeamScore = homeTeamScore;
    this.awayTeamScore = awayTeamScore;
  }
}
