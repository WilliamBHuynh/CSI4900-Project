import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleElementComponent } from './schedule-element.component';

describe('ScheduleElementComponent', () => {
  let component: ScheduleElementComponent;
  let fixture: ComponentFixture<ScheduleElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleElementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
