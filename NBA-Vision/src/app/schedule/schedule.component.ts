import { Component, OnInit, OnDestroy,ViewChild,ElementRef } from '@angular/core';
import {ScheduleEntry} from "./schedule-entry";
import {GameService} from "../service/game.service";
import {Subscription} from "rxjs";
import { HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit, OnDestroy {
  private data: any;
  subscription: Subscription;
  today = new Date();
  entries: ScheduleEntry[] = [];
  @ViewChild('entryContainer', { static: true }) entry: ElementRef;
  constructor(private service: GameService,private router: Router) { }
  fontSize = 1;
  

  changeFont(operator:any) {
    operator === '+' ? this.fontSize+=0.25 : this.fontSize-=0.25;
    (this.entry.nativeElement as HTMLParagraphElement).style.transform = `scale(`+this.fontSize+')';
    
  }

  ngOnInit(): void {
    this.refreshSchedule();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  refreshSchedule(): void {
    this.subscription = this.service.getSchedule().subscribe((res: any) => {
      this.data = JSON.parse(res);
      this.renderSchedule();
    });
  }

  renderSchedule(): void {
    let convertedCurrentDate = this.today.toISOString().split('T', 1)[0];
    for (let i = 0; i < Object.keys(this.data.DATE).length; i++) {
      if (this.data.DATE[i].split('T', 1)[0] == convertedCurrentDate) {
        const newEntry: ScheduleEntry = {date: this.data.DATE[i], homeTeamName: this.convertTeamName(this.data.HOME[i]),
          awayTeamName: this.convertTeamName(this.data.VISITOR[i]), live: this.data.HOME_PTS[i] != null,
          homeTeamScore: this.data.HOME_PTS[i], awayTeamScore: this.data.VISITOR_PTS[i]};
        this.addEntry(newEntry);
      }
    }
  }

  goBackDay(): void {
    this.today.setDate(this.today.getDate() - 1);
    this.entries = [];
    this.renderSchedule();
  }

  goForwardDay(): void {
    this.today.setDate(this.today.getDate() + 1);
    this.entries = [];
    this.renderSchedule();
  }

  addEntry(entry: ScheduleEntry): void {
    this.entries.push(entry);
  }

  convertMonth(monthNum: string): string {
    switch(monthNum) {
      case "1":
        return "Jan";
      case "2":
        return "Feb";
      case "3":
        return "Mar";
      case "4":
        return "Apr";
      case "5":
        return "May";
      case "6":
        return "Jun";
      case "7":
        return "Jul";
      case "8":
        return "Aug";
      case "9":
        return "Sep";
      case "10":
        return "Oct";
      case "11":
        return "Nov";
      case "12":
        return "Dec";
      default:
        return "Today";
    }
  }

  convertTeamName(name: string): string {
    switch(name.toUpperCase()) {
      case "BROOKLYN NETS":
        return "bkn";
      case "MILWAUKEE BUCKS":
        return "mil";
      case "BOSTON CELTICS":
        return "bos";
      case "CHARLOTTE HORNETS":
        return "cha";
      case "ATLANTA HAWKS":
        return "atl";
      case "CHICAGO BULLS":
        return "chi";
      case "CLEVELAND CAVALIERS":
        return "cle";
      case "DALLAS MAVERICKS":
        return "dal";
      case "DENVER NUGGETS":
        return "den";
      case "DETROIT PISTONS":
        return "det";
      case "GOLDEN STATE WARRIORS":
        return "gsw";
      case "HOUSTON ROCKETS":
        return "hou";
      case "INDIANA PACERS":
        return "ind";
      case "LOS ANGELES CLIPPERS":
        return "lac";
      case "LOS ANGELES LAKERS":
        return "lal";
      case "MEMPHIS GRIZZLIES":
        return "mem";
      case "MIAMI HEAT":
        return "mia";
      case "MINNESOTA TIMBERWOLVES":
        return "min";
      case "NEW ORLEANS PELICANS":
        return "nop";
      case "NEW YORK KNICKS":
        return "nyk";
      case "OKLAHOMA CITY THUNDER":
        return "okc";
      case "ORLANDO MAGIC":
        return "orl";
      case "PHILADELPHIA 76ERS":
        return "phi";
      case "PHOENIX SUNS":
        return "phx";
      case "PORTLAND TRAIL BLAZERS":
        return "por";
      case "SACRAMENTO KINGS":
        return "sac";
      case "SAN ANTONIO SPURS":
        return "sas";
      case "TORONTO RAPTORS":
        return "tor";
      case "UTAH JAZZ":
        return "uta";
      case "WASHINGTON WIZARDS":
        return "was";
      default:
        return "";
    }
  }

  @HostListener('document:keydown', ['$event']) onKeyDown(e:any){

    if (e.keyCode == 39) {
      this.goForwardDay()
    }
    else if (e.ctrlKey && e.keyCode == 37){
      this.router.navigate(['/']);
    }
    else if (e.keyCode == 37){
      this.goBackDay()
    }
    else if (e.keyCode == 187){
      this.changeFont('+')
    }
    else if (e.keyCode == 189){
      this.changeFont('-')
    }
  }
}
