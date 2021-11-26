import { Component, OnInit ,ViewChild, ElementRef} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { HttpErrorResponse } from '@angular/common/http';
import {GameService} from "../service/game.service";
import { Observable } from 'rxjs';
import { DOCUMENT } from '@angular/common'; 
import { ScheduleEntry } from '../schedule/schedule-entry';
import { HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { LiveAnnouncer } from '@angular/cdk/a11y';




@Component({
  selector: 'app-predictions',
  templateUrl: './predictions.component.html',
  styleUrls: ['./predictions.component.css']
  
})
export class PredictionsComponent implements OnInit {
  private predData: any;
  title = "";
  team1 = "";
  FGM = "";
  FGA = "";
  TPM = "";
  TPA = "";
  FTM = "";
  FTA = "";
  OR = "";
  DR = "";
  AST = "";
  STL = "";
  BLK = "";
  TO = "";
  PF = "";
  LOC = "";
  OPP = "";
  ELO = "";
  DEF = "";
  team2 = "";
  FGM2 = "";
  FGA2= "";
  TPM2 = "";
  TPA2 = "";
  FTM2 = "";
  FTA2 = "";
  OR2 = "";
  DR2 = "";
  AST2 = "";
  STL2 = "";
  BLK2 = "";
  TO2 = "";
  PF2 = "";
  LOC2 = "";
  OPP2 = "";
  ELO2 = "";
  DEF2 = "";
  Outcome ="";

  fontSize = 20;
  @ViewChild('predTbl', { static: true }) predTbl: ElementRef;
  @ViewChild('loading', { static: true }) loading: ElementRef;
  
  i=0;

  constructor(private service: GameService,private router: Router,private announcer: LiveAnnouncer) {
    
   }


  ngOnInit(): void {

    this.announcer.announce("Use shift plus arrow keys to move through days. Add and subtract keys to zoom in and out. Control plus left arrow key to return home")
    this.getPredictions();

  }


  getGame(i:number){

		this.team1 = this.unNormalizeName(+this.service.predData.team[i])
        this.team2 = this.unNormalizeName(+this.service.predData.team2[i])
        this.FGM  = this.service.predData.FGM[i] 
        this.FGA  = this.service.predData.FGA[i] 
        this.TPM  = this.service.predData.TPM[i] 
        this.TPA  = this.service.predData.TPA[i]
        this.FTM  = this.service.predData.FTM[i]
        this.FTA  = this.service.predData.FTA[i] 
        this.OR  = this.service.predData.OR[i] 
        this.DR  = this.service.predData.DR[i] 
        this.AST  = this.service.predData.AS[i]
        this.STL = this.service.predData.STL[i]
        this.BLK  = this.service.predData.BLK[i] 
        this.TO  = this.service.predData.TO[i] 
        this.PF  = this.service.predData.PF[i] 
        this.LOC  = ((this.service.predData.LOC[i]==1) ? 'Home' : 'Away');
        this.ELO  = this.service.predData.ELO[i] 
        this.DEF = (this.service.predData.DEF[i]*100).toString()

        this.FGM2  = this.service.predData.FGM2[i] 
        this.FGA2  = this.service.predData.FGA2[i] 
        this.TPM2  = this.service.predData.TPM2[i] 
        this.TPA2  = this.service.predData.TPA2[i]
        this.FTM2  = this.service.predData.FTM2[i]
        this.FTA2  = this.service.predData.FTA2[i] 
        this.OR2  = this.service.predData.OR2[i] 
        this.DR2  = this.service.predData.DR2[i] 
        this.AST2  = this.service.predData.AS2[i]
        this.STL2 = this.service.predData.STL2[i]
        this.BLK2  = this.service.predData.BLK2[i] 
        this.TO2  = this.service.predData.TO2[i] 
        this.PF2  = this.service.predData.PF2[i] 
        this.LOC2  = ((this.service.predData.LOC2[i]==1) ? 'Home' : 'Away');
        this.ELO2  = this.service.predData.ELO2[i] 
        this.DEF2 = (this.service.predData.DEF2[i]*100).toString()

        this.Outcome = this.service.predData.OUTCOME[i]

        if (+this.Outcome==1){
          this.Outcome=this.team1
      }else{
        this.Outcome=this.team2
      }
      
  }


  unNormalizeName(name:number){
    switch(name) {
      case 1:
        return "Boston Celtics";
      case 2:
        return "Brooklyn Nets";
      case 19:
        return "New York Knicks";
      case 22:
        return "Philadelphia 76ers";
      case 27:
        return "Toronto Raptors";
      case 4:
        return "Chicago Bulls";
      case 5:
        return "Cleveland Cavaliers";
      case 8:
        return "Detroit Pistons";
      case 11:
        return "Indiana Pacers";
      case 16:
        return "Milwaukee Bucks";
      case 0:
        return "Atlanta Hawks";
      case 3:
        return "Charlotte Hornets";
      case 15:
        return "Miami Heat";
      case 21:
        return "Orlando Magic";
      case 29:
        return "Washington Wizards";
      case 7:
        return "Denver Nuggets";
      case 17:
        return "Minnesota Timberwolves";
      case 20:
        return "Oklahoma City Thunder";
      case 24:
        return "Portland Trail Blazers";
      case 28:
        return "Utah Jazz";
      case 9:
        return "Golden State Warriors";
      case 12:
        return "Los Angeles Clippers";
      case 13:
        return "Los Angeles Lakers";
      case 23:
        return "Phoenix Suns";
      case 25:
        return "Sacramento Kings";
      case 6:
        return "Dallas Mavericks";
      case 10:
        return "Houston Rockets";
      case 14:
        return "Memphis Grizzlies";
      case 18:
        return "New Orleans Pelicans";
      case 26:
        return "San Antonio Spurs";
      default:
        return "";
    }
  }

  @HostListener('document:keydown', ['$event']) onKeyDown(e:any){

    if (e.shiftKey && e.keyCode == 39) {
      this.nextGame('next')
    }
    else if (e.ctrlKey && e.keyCode == 37){
      this.router.navigate(['/']);
    }
    else if (e.shiftKey && e.keyCode == 37){
      this.nextGame('back')
    }
    else if (e.keyCode == 187){
      this.changeFont('+')
    }
    else if (e.keyCode == 189){
      this.changeFont('-')
    }
  }


  changeFont(operator:any) {
    if (this.fontSize > 70){
      this.fontSize=70
    }
    else if (this.fontSize<10){
      this.fontSize=10
    }

    operator === '+' ? this.fontSize+=5 : this.fontSize-=5;
    (this.predTbl.nativeElement as HTMLParagraphElement).style.fontSize = `${this.fontSize}px`;
    
  }


  getPredictions(){
    
    if (this.service.predData==undefined){

    this.service.getPrediction().subscribe(
      (data:any) => {
        this.service.predData = JSON.parse(data)
        this.getGame(this.i);
        (this.predTbl.nativeElement as HTMLParagraphElement).style.visibility = `visible`;
        (this.loading.nativeElement as HTMLParagraphElement).style.display = `none`;
      },
      (err: HttpErrorResponse) => {
        console.log (err.message);
      }

    );
    }else {
      (this.loading.nativeElement as HTMLParagraphElement).style.display = `none`;
      this.getGame(this.i);
      (this.predTbl.nativeElement as HTMLParagraphElement).style.visibility = `visible`;
    }
    

  }
  
  nextGame(increment:string){

    
    length = Object.keys(this.service.predData.team).length

    if (increment == "next"){
      this.i += 1
      if (this.i == length){
        this.i=0;
      } 
    }else if (increment=="back"){
      this.i -= 1
      if (this.i == -1){
        this.i=length-1;
      } 
    }

    this.getGame(this.i)
  }


}
