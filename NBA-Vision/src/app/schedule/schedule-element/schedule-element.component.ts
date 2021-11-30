import {Component, Input, OnInit} from '@angular/core';
import {ScheduleEntry} from "../schedule-entry";
import Utils from "../../utils.";
import {Router} from "@angular/router";

@Component({
  selector: 'app-schedule-element',
  templateUrl: './schedule-element.component.html',
  styleUrls: ['./schedule-element.component.css']
})
export class ScheduleElementComponent implements OnInit {
  @Input() entry: ScheduleEntry;
  teamHomeAbv: string;
  teamAwayAbv: string;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.teamHomeAbv = Utils.convertTeamName(this.entry.homeTeamName);
    this.teamAwayAbv = Utils.convertTeamName(this.entry.awayTeamName);
  }

  ariaLabel(): string {
    const teams: string = this.entry.homeTeamName + " versus " + this.entry.awayTeamName;
    const score: string = this.entry.homeTeamScore == undefined ? "Game scheduled." : "Score " + this.entry.homeTeamScore
      + " to " + this.entry.awayTeamScore;
    return teams + " " + score;
  }

  open(): void {
    let dateEntry = this.entry.date +'';
    const scheduled = this.entry.homeTeamScore == undefined;
    const teamHomeAbvUpper = this.teamHomeAbv.toUpperCase();
    const teamAwayAbvUpper = this.teamAwayAbv.toUpperCase();
    this.router.navigateByUrl('/boxscores', { state: { scheduled: scheduled,
        params: dateEntry.substring(0, 10) + '/' + teamHomeAbvUpper + '/' + teamAwayAbvUpper + '/',
        homeTeamAbv: teamHomeAbvUpper, awayTeamAbv: teamAwayAbvUpper} });
  }
}
