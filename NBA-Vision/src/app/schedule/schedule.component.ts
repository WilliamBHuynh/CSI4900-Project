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

    if (this.fontSize > 5){
      this.fontSize=5
    }
    else if (this.fontSize<.5){
      this.fontSize=.5
    }

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
        const newEntry: ScheduleEntry = {date: this.data.DATE[i], homeTeamName: this.data.HOME[i],
          awayTeamName: this.data.VISITOR[i], live: this.data.HOME_PTS[i] != null,
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
