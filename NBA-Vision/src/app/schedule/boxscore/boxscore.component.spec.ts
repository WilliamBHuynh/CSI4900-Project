import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BoxscoreComponent } from './boxscore.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";

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
});
