export class ScheduleEntry {
  public homeTeamName: string;
  public awayTeamName: string;
  public live: boolean;
  public scheduled: boolean;
  public network?: string;
  public scheduledTime?: string;
  public homeTeamScore?: number;
  public awayTeamScore?: number;
  public timeRemaining?: number;
  public quarter?: string;

  constructor(homeTeamName: string,
              awayTeamName: string,
              live: boolean,
              scheduled: boolean,
              network?: string,
              scheduledTime?: string,
              homeTeamScore?: number,
              awayTeamScore?: number,
              timeRemaining?: number,
              quarter?: string) {
    this.homeTeamName = homeTeamName;
    this.awayTeamName = awayTeamName;
    this.live = live;
    this.scheduled = scheduled;
    this.network = network;
    this.scheduledTime = scheduledTime;
    this.homeTeamScore = homeTeamScore;
    this.awayTeamScore = awayTeamScore;
    this.timeRemaining = timeRemaining;
    this.quarter = quarter;
  }
}
