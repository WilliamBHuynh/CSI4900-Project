import {Component, ElementRef, HostListener, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {GameService} from "../../service/game.service";
import {Subscription} from "rxjs";
import {BoxscoreEntry} from "../../boxscore/boxscore-entry";
import {Router} from "@angular/router";
import Utils from "../../utils.";
import {LiveAnnouncer} from "@angular/cdk/a11y";

@Component({
  selector: 'app-boxscore',
  templateUrl: './boxscore.component.html',
  styleUrls: ['./boxscore.component.css']
})
export class BoxscoreComponent implements OnInit, OnDestroy {
  @Input() params: string;
  @Input() scheduled: boolean;
  @Input() homeTeamAbv: string;
  @Input() awayTeamAbv: string;
  homeTeam: string;
  awayTeam: string;
  res: any;
  err = false;
  entries: BoxscoreEntry[] = [];
  subscription: Subscription;
  selectedTeam: string;
  fontSize =20;
  fontSizeB =1;
  @ViewChild('boxScore', { static: true }) boxScore: ElementRef;
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

    (this.boxScore.nativeElement as HTMLParagraphElement).style.fontSize = `${this.fontSize}px`;
    (this.buttons.nativeElement as HTMLParagraphElement).style.transform = `scale(`+this.fontSizeB+')';
    (this.buttons.nativeElement as HTMLParagraphElement).style.transformOrigin= 'bottom';

  }
  constructor(public service: GameService, private  router: Router, private announcer: LiveAnnouncer) { }

  ngOnInit(): void {
    const state = history.state;
    this.scheduled = state.scheduled;
    this.params = state.params;
    this.homeTeamAbv = state.homeTeamAbv;
    this.awayTeamAbv = state.awayTeamAbv;
    this.selectedTeam = this.homeTeamAbv;
    this.homeTeam = Utils.convertTeamAbv(this.homeTeamAbv);
    this.awayTeam = Utils.convertTeamAbv(this.awayTeamAbv);
    this.selectedTeam = this.homeTeamAbv;
    this.subscription = this.service.getBoxScores(this.params).subscribe((data: any) => {
      this.res = JSON.parse(data);
      for (let i = 0; i < Object.keys(this.res.PLAYER).length; i++) {
        const newEntry: BoxscoreEntry = {player: this.res.PLAYER[i], mp: this.res.MP[i], pts: this.res.PTS[i], fg: this.res.FG[i],
          fga: this.res.FGA[i], fgaP: this.res.FGP[i], threeP: this.res.threeP[i], threePA: this.res.threePA[i], threePP:
            this.res.threePA[i] == 0 ? 0 : this.res.threePP[i],
          ft: this.res.FT[i], fta: this.res.FTA[i], ftaP: (this.res.FGA[i] == 'Did Not Play' || this.res.FGA[i] == 'Did Not Dress') ? 0 :
          parseFloat((this.res.FG[i]/this.res.FGA[i]).toFixed(3)), drb: this.res.DRB[i], trb: this.res.TRB[i], ast: this.res.AST[i],
          stl: this.res.STL[i], blk: this.res.BLK[i], tov: this.res.TOV[i], pf: this.res.PF[i], plusMinus: this.res.plusMinus[i], team: this.res.TEAM[i]};
        this.addEntry(newEntry);
      }
      this.err = false;
      this.announcer.announce("Box scores for " + this.homeTeam + " versus " + this.awayTeam + ". Hold alt key and g to return to games page.")
    },
      (error: any) => {
        if (this.scheduled) {
          this.announcer.announce("Game is currently scheduled. Please try again later.");
        } else {
          this.err = true;
          this.announcer.announce("An error was encountered. Please try again later.")
        }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  playerDetails(entry: BoxscoreEntry): void {
    this.announcer.announce("Minutes played: " + entry.mp + ", Points: " + entry.pts + ", Field goals: " + entry.fg + ", Field goal attempts: " + entry.fga + ", field goal percentage: " + entry.fgaP+ ", Three pointers: " +
      entry.threeP+ ", Three pointers attempted: " + entry.threePA + ", Three pointers percentage:" + entry.threePP + ", Free throws:" + entry.ft + ", Free throws attempted:" + entry.fta + ", Free throw percentage:" + entry.ftaP
      + ", Defensive rebounds:" + entry.drb + ", Total rebounds:" + entry.trb + ", Assists:" + entry.ast + ", Steals:" + entry.stl + ", Blocks:" + entry.blk + ", Turnovers:" +
      entry.tov + ", Personal fouls:" + entry.pf + ", Plus minus:" + entry.plusMinus);
  }

  navGames(): void {
    this.router.navigate(['/games']);
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

  @HostListener('document:keydown', ['$event']) onKeyDown(e:any){
    if (e.keyCode == 71){
      this.navGames();
    }
    else if (e.keyCode == 187){
      this.changeFont('+');
    }
    else if (e.keyCode == 189){
      this.changeFont('-');
    }
  }
}
