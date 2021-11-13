import { Component, OnInit ,ViewChild, ElementRef} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { HttpErrorResponse } from '@angular/common/http';
import {GameService} from "../service/game.service";
import { Observable } from 'rxjs';
import { DOCUMENT } from '@angular/common'; 
import { ScheduleEntry } from '../schedule/schedule-entry';
import { HostListener } from '@angular/core';
import { Router } from '@angular/router';



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

  done = 0;

  fontSize = 20;
  @ViewChild('predTbl', { static: true }) predTbl: ElementRef;
  
  i=0;
  arrTeams: string [];

  constructor(private service: GameService,private router: Router) {
    
   }


  ngOnInit(): void {

    this.getPredictions();

  }


  getPredictions(){

    this.service.getPrediction().subscribe(
      (data:any) => {
        this.predData = JSON.parse(data)
        //this.arrTeams = data as string [];	 // FILL THE ARRAY WITH DATA.
        console.log(this.predData);
        this.getGame(this.i)

        this.title="Loaded"
      },
      (err: HttpErrorResponse) => {
        console.log (err.message);
      }

    );

    this.title="Loading..."

    //this.service.getPrediction().subscribe((res: any) => {
      //this.data = JSON.parse(res);
   // });

    //console.log(this.data)
    //this.service.getPrediction().subscribe(prediction => console.log(prediction))
  }
  

  getGame(i:number){

    this.team1 = this.unNormalizeName(+this.predData.team[i])
        this.team2 = this.unNormalizeName(+this.predData.team2[i])
        this.FGM  = this.predData.FGM[i] 
        this.FGA  = this.predData.FGA[i] 
        this.TPM  = this.predData.TPM[i] 
        this.TPA  = this.predData.TPA[i]
        this.FTM  = this.predData.FTM[i]
        this.FTA  = this.predData.FTA[i] 
        this.OR  = this.predData.OR[i] 
        this.DR  = this.predData.DR[i] 
        this.AST  = this.predData.AS[i]
        this.STL = this.predData.STL[i]
        this.BLK  = this.predData.BLK[i] 
        this.TO  = this.predData.TO[i] 
        this.PF  = this.predData.PF[i] 
        this.LOC  = this.predData.LOC[i] 
        this.ELO  = this.predData.ELO[i] 
        this.DEF = (this.predData.DEF[i]*100).toString()

        this.FGM2  = this.predData.FGM2[i] 
        this.FGA2  = this.predData.FGA2[i] 
        this.TPM2  = this.predData.TPM2[i] 
        this.TPA2  = this.predData.TPA2[i]
        this.FTM2  = this.predData.FTM2[i]
        this.FTA2  = this.predData.FTA2[i] 
        this.OR2  = this.predData.OR2[i] 
        this.DR2  = this.predData.DR2[i] 
        this.AST2  = this.predData.AS2[i]
        this.STL2 = this.predData.STL2[i]
        this.BLK2  = this.predData.BLK2[i] 
        this.TO2  = this.predData.TO2[i] 
        this.PF2  = this.predData.PF2[i] 
        this.LOC2  = this.predData.LOC2[i] 
        this.ELO2  = this.predData.ELO2[i] 
        this.DEF2 = (this.predData.DEF2[i]*100).toString()

        this.Outcome = this.predData.OUTCOME[i]

        if (+this.Outcome==1){
          this.Outcome=this.team1
      }else{
        this.Outcome=this.team2
      }

  }

  nextGame(){
    console.log(this.i)
    this.i += 1
    if (this.i == length){
      this.i=0;
    } 
    length = Object.keys(this.predData.team).length

    this.getGame(this.i)
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

    if (e.keyCode == 39) {
      this.nextGame('next')
    }
    else if (e.ctrlKey && e.keyCode == 37){
      this.router.navigate(['/']);
    }
    else if (e.keyCode == 37){
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
    operator === '+' ? this.fontSize+=5 : this.fontSize-=5;
    (this.predTbl.nativeElement as HTMLParagraphElement).style.fontSize = `${this.fontSize}px`;
    
  }


  getPredictions(){
    console.log(this.done)
    if (this.done==0){
    this.service.getPrediction().subscribe(
      (data:any) => {
        this.predData = JSON.parse(data)
        this.getGame(this.i)
        this.done =1;
        this.title="Loaded";
        (this.predTbl.nativeElement as HTMLParagraphElement).style.visibility = `visible`;

      },
      (err: HttpErrorResponse) => {
        console.log (err.message);
      }

    );
    }else if (this.done==1){
      this.getGame(this.i)
    }
    
    this.title="Loading..."

  }
  

  getGame(i:number){

    this.team1 = this.unNormalizeName(+this.predData.team[i])
        this.team2 = this.unNormalizeName(+this.predData.team2[i])
        this.FGM  = this.predData.FGM[i] 
        this.FGA  = this.predData.FGA[i] 
        this.TPM  = this.predData.TPM[i] 
        this.TPA  = this.predData.TPA[i]
        this.FTM  = this.predData.FTM[i]
        this.FTA  = this.predData.FTA[i] 
        this.OR  = this.predData.OR[i] 
        this.DR  = this.predData.DR[i] 
        this.AST  = this.predData.AS[i]
        this.STL = this.predData.STL[i]
        this.BLK  = this.predData.BLK[i] 
        this.TO  = this.predData.TO[i] 
        this.PF  = this.predData.PF[i] 
        this.LOC  = this.predData.LOC[i] 
        this.ELO  = this.predData.ELO[i] 
        this.DEF = (this.predData.DEF[i]*100).toString()

        this.FGM2  = this.predData.FGM2[i] 
        this.FGA2  = this.predData.FGA2[i] 
        this.TPM2  = this.predData.TPM2[i] 
        this.TPA2  = this.predData.TPA2[i]
        this.FTM2  = this.predData.FTM2[i]
        this.FTA2  = this.predData.FTA2[i] 
        this.OR2  = this.predData.OR2[i] 
        this.DR2  = this.predData.DR2[i] 
        this.AST2  = this.predData.AS2[i]
        this.STL2 = this.predData.STL2[i]
        this.BLK2  = this.predData.BLK2[i] 
        this.TO2  = this.predData.TO2[i] 
        this.PF2  = this.predData.PF2[i] 
        this.LOC2  = this.predData.LOC2[i] 
        this.ELO2  = this.predData.ELO2[i] 
        this.DEF2 = (this.predData.DEF2[i]*100).toString()

        this.Outcome = this.predData.OUTCOME[i]

        if (+this.Outcome==1){
          this.Outcome=this.team1
      }else{
        this.Outcome=this.team2
      }

  }

  nextGame(increment:string){

    
    length = Object.keys(this.predData.team).length

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

}
