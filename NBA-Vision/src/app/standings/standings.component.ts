import {Component, OnDestroy, OnInit} from '@angular/core';
import {GameService} from "../service/game.service";
import {Subscription} from "rxjs";
import {StandingEntry} from "./standing-entry";

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.css']
})
export class StandingsComponent implements OnInit, OnDestroy {
  private data: any;
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
    this.service.getStanding().subscribe((res: any) => {
      this.data = JSON.parse(res);
      for (let i = 0; i < Object.keys(this.data.W).length; i++) {
        const newEntry: StandingEntry = {team: this.data.TEAM[i], w: this.data.W[i], l: this.data.L[i], wL: this.data.WL[i],
          gb: this.data.GB[i], pw: this.data.PW[i], pl: this.data.PL[i], psg: this.data.PSG[i], pag: this.data.PAG[i], div: this.data.DIV[i]}
        this.addStandingEntry(newEntry);
      }
    });
  }

  addStandingEntry(entry: StandingEntry): void {
    this.standingEntries.push(entry);
  }

  clickAll(): void {
    this.div = 'all';
  }

  clickEast(): void {
    this.div = 'east';
  }

  clickWest(): void {
    this.div = 'west';
  }
}
