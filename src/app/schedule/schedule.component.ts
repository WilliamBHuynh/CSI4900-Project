import { Component, OnInit, OnDestroy,ViewChild,ElementRef } from '@angular/core';
import {ScheduleEntry} from "./schedule-entry";
import {GameService} from "../service/game.service";
import {Subscription} from "rxjs";
import { HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { LiveAnnouncer } from '@angular/cdk/a11y';

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
  shortcutMsg = ". Hold the alt key and the following key for keyboard shortcuts: " +
                "B to go back a day, N to go next day, H to return to home page";

  @ViewChild('entryContainer', { static: true }) entry: ElementRef;
  constructor(private service: GameService,private router: Router,private announcer: LiveAnnouncer) { }
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
    this.announcer.announce(
      "Games for " + this.convertFullMonth(this.today.toISOString().split('T', 1)[0].split("-")[1]) +
      " " + this.today.toISOString().split('T', 1)[0].split("-")[2] + this.shortcutMsg);
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
    this.announceDate();
  }

  goForwardDay(): void {
    this.today.setDate(this.today.getDate() + 1);
    this.entries = [];
    this.renderSchedule();
    this.announceDate();
  }

  addEntry(entry: ScheduleEntry): void {
    this.entries.push(entry);
  }

  announceDate(): void {
    this.announcer.announce(
      "Games for " + this.convertFullMonth(this.today.toISOString().split('T', 1)[0].split("-")[1]) +
      " " + this.today.toISOString().split('T', 1)[0].split("-")[2]);
  }

  navHome(): void {
    this.router.navigate(['/']);
  }

  convertMonth(monthNum: string): string {
    switch(monthNum) {
      case "01":
        return "Jan";
      case "02":
        return "Feb";
      case "03":
        return "Mar";
      case "04":
        return "Apr";
      case "05":
        return "May";
      case "06":
        return "Jun";
      case "07":
        return "Jul";
      case "08":
        return "Aug";
      case "09":
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

  convertFullMonth(monthNum: string): string {
    switch(monthNum) {
      case "01":
        return "January";
      case "02":
        return "February";
      case "03":
        return "March";
      case "04":
        return "April";
      case "05":
        return "May";
      case "06":
        return "June";
      case "07":
        return "July";
      case "08":
        return "August";
      case "09":
        return "September";
      case "10":
        return "October";
      case "11":
        return "November";
      case "12":
        return "December";
      default:
        return "Today";
    }
  }

  @HostListener('document:keydown', ['$event']) onKeyDown(e:any){

    if (e.keyCode == 78) {
      this.goForwardDay();
    }
    else if (e.keyCode == 72){
      this.router.navigate(['/']);
    }
    else if (e.keyCode == 66){
      this.goBackDay();
    }
    else if (e.keyCode == 187){
      this.changeFont('+');
    }
    else if (e.keyCode == 189){
      this.changeFont('-');
    }
  }
}
