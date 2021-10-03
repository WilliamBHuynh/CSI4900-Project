import { Component, OnInit } from '@angular/core';
import {ScheduleEntry} from "./schedule-entry";

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  entries: ScheduleEntry[] = [];
  testEntryScheduled: ScheduleEntry = {homeTeamName: 'TOR', awayTeamName: 'WAS', live: false, scheduled: true};
  testEntryLive: ScheduleEntry = {homeTeamName: 'WAS', awayTeamName: 'TOR', live: true, scheduled: false};
  testEntryDone: ScheduleEntry = {homeTeamName: 'TOR', awayTeamName: 'WAS', live: false, scheduled: false};
  constructor() { }

  ngOnInit(): void {
    this.addEntry(this.testEntryScheduled);
    this.addEntry(this.testEntryLive);
    this.addEntry(this.testEntryDone);
  }

  addEntry(entry: ScheduleEntry) {
    this.entries.push(entry);
  }
}
