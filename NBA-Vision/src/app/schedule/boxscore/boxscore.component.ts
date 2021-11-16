import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {GameService} from "../../service/game.service";
import {Subscription} from "rxjs";
import {BoxscoreEntry} from "../../boxscore/boxscore-entry";

@Component({
  selector: 'app-boxscore',
  templateUrl: './boxscore.component.html',
  styleUrls: ['./boxscore.component.css']
})
export class BoxscoreComponent implements OnInit, OnDestroy {
  @Input() params: string;
  @Input() homeTeamAbv: string;
  @Input() awayTeamAbv: string;
  res: any;
  err = false;
  entries: BoxscoreEntry[] = [];
  subscription: Subscription;
  selectedTeam: string;
  constructor(public activeModal: NgbActiveModal, public service: GameService) { }

  ngOnInit(): void {
    this.selectedTeam = this.homeTeamAbv;
    this.subscription = this.service.getBoxScores(this.params).subscribe((data: any) => {
      this.res = JSON.parse(data);
      for (let i = 0; i < Object.keys(this.res.PLAYER).length; i++) {
        const newEntry: BoxscoreEntry = {player: this.res.PLAYER[i], mp: this.res.MP[i], pts: this.res.PTS[i], fg: this.res.FG[i],
          fga: this.res.FGA[i], fgaP: this.res.FGP[i], threeP: this.res.threeP[i], threePA: this.res.threePA[i], threePP: this.res.threePP[i],
          ft: this.res.FT[i], fta: this.res.FTA[i], ftaP: (this.res.FGA[i] == 'Did Not Play' || this.res.FGA[i] == 'Did Not Dress') ? 0 :
          parseFloat((this.res.FG[i]/this.res.FGA[i]).toFixed(3)), drb: this.res.DRB[i], trb: this.res.TRB[i], ast: this.res.AST[i],
          stl: this.res.STL[i], blk: this.res.BLK[i], tov: this.res.TOV[i], pf: this.res.PF[i], plusMinus: this.res.plusMinus[i], team: this.res.TEAM[i]};
        this.addEntry(newEntry);
      }
      this.err = false;
    },
      (error: any) => {
        this.err = true;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  addEntry(entry: BoxscoreEntry): void {
    this.entries.push(entry);
  }

  clickHomeTeam(): void {
    this.selectedTeam = this.homeTeamAbv;
  }

  clickAwayTeam(): void {
    this.selectedTeam = this.awayTeamAbv;
  }
}
