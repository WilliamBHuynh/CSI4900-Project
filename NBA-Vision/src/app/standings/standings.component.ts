import {Component, OnDestroy, OnInit,ViewChild,ElementRef} from '@angular/core';
import {GameService} from "../service/game.service";
import {Subscription} from "rxjs";
import {StandingEntry} from "./standing-entry";
import { HostListener } from '@angular/core';
import { Router } from '@angular/router';
import Utils from "../utils.";
import { LiveAnnouncer } from '@angular/cdk/a11y';


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
  fontSize =20;
  fontSizeB =1;
  shortCutsMsg = "Hold the alt key and the following key for keyboard shortcuts: " +
                "A for all conferences, E for eastern conference, W for western conference, and H to return to home page. ";

  @ViewChild('standings', { static: true }) standings: ElementRef;
  @ViewChild('buttons', { static: true }) buttons: ElementRef;


  changeFont(operator:any) {


    if (this.fontSize > 80){
      this.fontSize=80
    }
    else if (this.fontSize<15){
      this.fontSize=15
    }

    if (this.fontSizeB > 1.5){
      this.fontSizeB=1.5
    }
    else if (this.fontSizeB<.75){
      this.fontSizeB=.75
    }

    if (operator=='+'){
      this.fontSize+=5
      this.fontSizeB +=.25;
    }else{
      this.fontSize-=5
      this.fontSizeB -=.25;
    }

    (this.standings.nativeElement as HTMLParagraphElement).style.fontSize = `${this.fontSize}px`;
    (this.buttons.nativeElement as HTMLParagraphElement).style.transform = `scale(`+this.fontSizeB+')';
    (this.buttons.nativeElement as HTMLParagraphElement).style.transformOrigin= 'bottom';

  }
  constructor(private service: GameService,private router: Router,private announcer: LiveAnnouncer) { }

  ngOnInit(): void {
    this.refreshStandings();
    this.announcer.announce(
      "Standings page. " + this.shortCutsMsg);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  navHome(): void {
    this.router.navigate(['/']);
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

  teamDetails(entry: StandingEntry) {
    this.announcer.announce("Wins: " + entry.w + ", lost: " + entry.l + ", win, lost percentage: " + entry.wL + ", Pythagorean wins: " + entry.pw + ", Pythagorean lost: " + entry.pl+ ", Points scored per game: " +
      entry.psg+ ", Points allowed per game: " + entry.pag);
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

  @HostListener('document:keydown', ['$event']) onKeyDown(e:any){

    console.log(e.keyCode)

    if (e.keyCode == 69) {
      this.clickEast()
    }
    else if (e.keyCode == 72){
      this.router.navigate(['/']);
    }
    else if (e.keyCode == 65){
      this.clickAll()
    }
    else if (e.keyCode == 87){
      this.clickWest()
    }
    else if (e.keyCode == 187){
      this.changeFont('+')
    }
    else if (e.keyCode == 189){
      this.changeFont('-')
    }
  }
}
