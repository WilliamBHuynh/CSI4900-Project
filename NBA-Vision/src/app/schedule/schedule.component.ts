import { Component, OnInit } from '@angular/core';
import {ScheduleEntry} from "./schedule-entry";
import {GameService} from "../service/game.service";

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  entries: ScheduleEntry[] = [];
  constructor(private service: GameService) { }

  ngOnInit(): void {
    this.refreshGames();
  }

  refreshGames(): void {
    this.service.getGames().subscribe(data => {
      data.forEach(game => {
        const newEntry: ScheduleEntry = {homeTeamName: game.HomeTeamName, awayTeamName: game.VisitTeamName};
        this.addEntry(newEntry);
      });
    })
  }

  addEntry(entry: ScheduleEntry) {
    this.entries.push(entry);
  }
}
