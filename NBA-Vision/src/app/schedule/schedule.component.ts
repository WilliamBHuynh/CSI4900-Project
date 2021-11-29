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
  shortcutMsg = ". Use shift plus arrow keys to move through days. " +
                "Use control key plus left arrow key to return home.";
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
      " " + this.today.getDate() + this.shortcutMsg);
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
      " " + this.today.getDate());
  }

  navHome(): void {
    this.router.navigate(['/']);
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

  convertFullMonth(monthNum: string): string {
    switch(monthNum) {
      case "1":
        return "January";
      case "2":
        return "February";
      case "3":
        return "March";
      case "4":
        return "April";
      case "5":
        return "May";
      case "6":
        return "June";
      case "7":
        return "July";
      case "8":
        return "August";
      case "9":
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

    if (e.shiftKey && e.keyCode == 39) {
      this.goForwardDay();
    }
    else if (e.ctrlKey && e.keyCode == 37){
      this.router.navigate(['/']);
    }
    else if (e.keyCode == 82) {
      this.announcer.announce(
        "Games for " + this.convertFullMonth(this.today.toISOString().split('T', 1)[0].split("-")[1]) +
        " " + this.today.getDate() + this.shortcutMsg);
    }
    else if (e.shiftKey && e.keyCode == 37){
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
