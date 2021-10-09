import { Component, OnInit } from '@angular/core';
import {ScheduleEntry} from "./schedule-entry";

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  entries: ScheduleEntry[] = [];
  testEntryScheduled: ScheduleEntry = {homeTeamName: 'LAL', awayTeamName: 'WAS', live: false, scheduled: true,
    scheduledTime: '5:00 PM', network: 'ABC'};
  testEntryLive: ScheduleEntry = {homeTeamName: 'WAS', awayTeamName: 'LAL', live: true, scheduled: false,
    homeTeamScore: 100, awayTeamScore: 99, timeRemaining: 12.4, quarter: '2nd', scheduledTime: '5:00 PM', network: 'ABC'};
  testEntryDone: ScheduleEntry = {homeTeamName: 'LAL', awayTeamName: 'WAS', live: false, scheduled: false,
    homeTeamScore: 100, awayTeamScore: 99, scheduledTime: '5:00 PM', network: 'ABC'};
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
