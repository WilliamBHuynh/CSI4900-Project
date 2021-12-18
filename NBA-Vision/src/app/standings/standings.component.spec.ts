import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandingsComponent } from './standings.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {StandingEntry} from "./standing-entry";

describe('StandingsComponent', () => {
  let component: StandingsComponent;
  let fixture: ComponentFixture<StandingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StandingsComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StandingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set rank to 1', () => {
    component.clearRank();
    expect(component.rank).toEqual(1);
  });

  it('should increment rank', () => {
    component.clearRank();
    component.incrementRank();
    expect(component.rank).toEqual(2);
  });

  it('should add new standing entry to standings entries list', () => {
    component.addStandingEntry(new StandingEntry("Toronto Raptors", 82, 0, 1, 1, 1, 1, 1, 1, "EAST" ));
    expect(component.standingEntries.length).toEqual(1);
  });

  it('should set division to all and clear rankings on click all', () => {
    component.clickAll();
    expect(component.div).toEqual('all');
    expect(component.rank).toEqual(1);
  });

  it('should set division to east and clear rankings on click all', () => {
    component.clickEast();
    expect(component.div).toEqual('east');
    expect(component.rank).toEqual(1);
  });

  it('should set division to west and clear rankings on click all', () => {
    component.clickWest();
    expect(component.div).toEqual('west');
    expect(component.rank).toEqual(1);
  });
});
