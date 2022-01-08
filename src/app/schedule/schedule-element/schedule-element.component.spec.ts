import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleElementComponent } from './schedule-element.component';
import {RouterTestingModule} from "@angular/router/testing";
import {ScheduleEntry} from "../schedule-entry";

describe('ScheduleElementComponent', () => {
  let component: ScheduleElementComponent;
  let fixture: ComponentFixture<ScheduleElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleElementComponent ],
      imports: [RouterTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleElementComponent);
    component = fixture.componentInstance;
    component.entry = new ScheduleEntry(new Date, "Toronto Raptors", "Brooklyn Nets", false);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
