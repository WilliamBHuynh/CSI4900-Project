import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BoxscoreComponent } from './boxscore.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {BoxscoreEntry} from "../../boxscore/boxscore-entry";

describe('BoxscoreComponent', () => {
  let component: BoxscoreComponent;
  let fixture: ComponentFixture<BoxscoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoxscoreComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxscoreComponent);
    component = fixture.componentInstance;
    const scheduled = true;
    const teamHomeAbvUpper = "TOR";
    const teamAwayAbvUpper = "WAS";
    const params = '2021-09-15' + '/' + teamHomeAbvUpper + '/' + teamAwayAbvUpper + '/';
    window.history.pushState({scheduled: scheduled, params: params, homeTeamAbv: teamHomeAbvUpper, awayTeamAbv: teamAwayAbvUpper}, 'history');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add entry to entries list', () => {
    component.addEntry(new BoxscoreEntry("Scottie Barnes", 36, 18, 50, 13, 57, 14, 4, 37,
        35, 8, 77, 6, 3, 4, 1, 2, 1, 4, 9, "Toronto Raptors"));
    expect(component.entries.length).toEqual(1);
  });

  it('should update selected home and away team values on click', () => {
    const newHomeAbv = 'BKN';
    const newAwayAbv = 'LAL';
    component.homeTeamAbv = newHomeAbv;
    component.clickHomeTeam();
    expect(component.selectedTeam).toEqual(newHomeAbv);
    component.awayTeamAbv = newAwayAbv;
    component.clickAwayTeam();
    expect(component.selectedTeam).toEqual(newAwayAbv);
  });
});
