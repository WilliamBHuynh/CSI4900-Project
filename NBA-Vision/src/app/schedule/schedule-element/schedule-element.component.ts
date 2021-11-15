import {Component, Input, OnInit} from '@angular/core';
import {ScheduleEntry} from "../schedule-entry";
import Utils from "../../utils.";

@Component({
  selector: 'app-schedule-element',
  templateUrl: './schedule-element.component.html',
  styleUrls: ['./schedule-element.component.css']
})
export class ScheduleElementComponent implements OnInit {
  @Input() entry: ScheduleEntry;
  teamHomeAbv: string;
  teamAwayAbv: string;
  constructor() { }

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

}
