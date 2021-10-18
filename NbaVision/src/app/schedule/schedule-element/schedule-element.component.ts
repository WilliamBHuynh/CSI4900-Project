import {Component, Input, OnInit} from '@angular/core';
import {ScheduleEntry} from "../schedule-entry";

@Component({
  selector: 'app-schedule-element',
  templateUrl: './schedule-element.component.html',
  styleUrls: ['./schedule-element.component.css']
})
export class ScheduleElementComponent implements OnInit {
  @Input() entry: ScheduleEntry;
  constructor() { }

  ngOnInit(): void {
  }

}
