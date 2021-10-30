import { Component, OnInit } from '@angular/core';
import {ScheduleEntry} from "./schedule-entry";
import {GameService} from "../service/game.service";

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  today = new Date();
  entries: ScheduleEntry[] = [];
  constructor(private service: GameService) { }

  ngOnInit(): void {
    this.refreshGames();
  }

  refreshGames(): void {
    this.service.getSchedule().subscribe((res: any) => {
      const data = JSON.parse(res);
      const convertedCurrentDate = this.today.toISOString().split('T', 1)[0];
      console.log(convertedCurrentDate)
      for (let i = 0; i < Object.keys(data.DATE).length; i++) {
        if (data.DATE[i].split('T', 1)[0] == convertedCurrentDate) {
          const newEntry: ScheduleEntry = {date: data.DATE[i], homeTeamName: this.convertTeamName(data.HOME[i]),
            awayTeamName: this.convertTeamName(data.VISITOR[i]), live: data.HOME_PTS[i] != null, homeTeamScore: data.HOME_PTS[i],
            awayTeamScore: data.VISITOR_PTS[i]};
          this.addEntry(newEntry);
        }
      }
    });
  }

  addEntry(entry: ScheduleEntry) {
    this.entries.push(entry);
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
