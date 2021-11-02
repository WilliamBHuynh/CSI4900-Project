import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleComponent } from './schedule.component';
import {ScheduleEntry} from "./schedule-entry";

describe('ScheduleComponent', () => {
  let component: ScheduleComponent;
  let fixture: ComponentFixture<ScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show final score', () => {
    const newEntry: ScheduleEntry = {homeTeamName: "TOR", awayTeamName: "LAC", live: true, homeTeamScore: 100,
      awayTeamScore: 88, date: new Date()};
    component.addEntry(newEntry);
    expect(component).toContain(newEntry.homeTeamScore);
  });

  it('should show no score', () => {
    const newEntry: ScheduleEntry = {homeTeamName: "TOR", awayTeamName: "LAC", live: false, homeTeamScore: 0,
      awayTeamScore: 0, date: new Date()};
    component.addEntry(newEntry);
    expect(component).toContain(0);
  });
});
