import { Component, OnInit } from '@angular/core';
import {ScheduleEntry} from "./schedule-entry";
import {GameService} from "../service/game.service";

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  private data: any;
  today = new Date();
  entries: ScheduleEntry[] = [];
  constructor(private service: GameService) { }

  ngOnInit(): void {
    this.refreshSchedule();
  }

  refreshSchedule(): void {
    this.service.getSchedule().subscribe((res: any) => {
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

  addEntry(entry: ScheduleEntry) {
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
}
