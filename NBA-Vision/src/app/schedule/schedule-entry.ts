export class ScheduleEntry {
  public date: Date;
  public homeTeamName: string;
  public awayTeamName: string;
  public live: boolean;
  public homeTeamScore?: number;
  public awayTeamScore?: number;

  constructor(date: Date,
              homeTeamName: string,
              awayTeamName: string,
              live: boolean,
              scheduledTime?: string,
              homeTeamScore?: number,
              awayTeamScore?: number) {
    this.date = date;
    this.homeTeamName = homeTeamName;
    this.awayTeamName = awayTeamName;
    this.live = live;
    this.homeTeamScore = homeTeamScore;
    this.awayTeamScore = awayTeamScore;
  }
}
