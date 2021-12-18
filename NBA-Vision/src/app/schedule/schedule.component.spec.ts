import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleComponent } from './schedule.component';
import {ScheduleEntry} from "./schedule-entry";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";

describe('ScheduleComponent', () => {
  let component: ScheduleComponent;
  let fixture: ComponentFixture<ScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule ]
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

  it('should add a entry to entries list', () => {
    const newEntry: ScheduleEntry = {homeTeamName: "TOR", awayTeamName: "LAC", live: true, homeTeamScore: 100,
      awayTeamScore: 88, date: new Date()};
    component.addEntry(newEntry);
    expect(component.entries.length).toEqual(1);
  });
});
