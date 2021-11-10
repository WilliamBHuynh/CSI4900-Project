import {Component, OnDestroy, OnInit} from '@angular/core';
import {GameService} from "../service/game.service";
import {Subscription} from "rxjs";
import {StandingEntry} from "./standing-entry";
import Utils from "../utils.";

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.css']
})
export class StandingsComponent implements OnInit, OnDestroy {
  private data: any;
  rank: number = 1;
  div: string = 'all';
  standingEntries: StandingEntry[] = [];
  subscription: Subscription;
  constructor(private service: GameService) { }

  ngOnInit(): void {
    this.refreshStandings();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  refreshStandings(): void {
    this.subscription = this.service.getStanding().subscribe((res: any) => {
      this.data = JSON.parse(res);
      for (let i = 0; i < Object.keys(this.data.W).length; i++) {
        const newEntry: StandingEntry = {team: this.data.TEAM[i], w: this.data.W[i], l: this.data.L[i], wL: this.data.WL[i].toFixed(3),
          gb: this.data.GB[i], pw: this.data.PW[i], pl: this.data.PL[i], psg: this.data.PSG[i], pag: this.data.PAG[i], div: this.data.DIV[i]}
        this.addStandingEntry(newEntry);
      }
      this.standingEntries.sort((a: StandingEntry, b: StandingEntry) => ((a.wL) > (b.wL) ? -1 : 1));
    });
  }

  addStandingEntry(entry: StandingEntry): void {
    this.standingEntries.push(entry);
  }

  convertTeamName(name: string): string {
    return Utils.convertTeamName(name);
  }

  clickAll(): void {
    this.div = 'all';
    this.clearRank();
  }

  clickEast(): void {
    this.div = 'east';
    this.clearRank();
  }

  clickWest(): void {
    this.div = 'west';
    this.clearRank();
  }

  clearRank(): void {
    this.rank = 1;
  }

  incrementRank(): void {
    this.rank++;
  }
}
