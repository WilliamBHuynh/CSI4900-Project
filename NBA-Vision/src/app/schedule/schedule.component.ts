import { Component, OnInit } from '@angular/core';
import {ScheduleEntry} from "./schedule-entry";
import {GameService} from "../service/game.service";

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  entries: ScheduleEntry[] = [];
  constructor(private service: GameService) { }

  ngOnInit(): void {
    this.refreshGames();
  }

  refreshGames(): void {
    this.service.getSchedule().subscribe((data: any) => {
      var obj = JSON.parse(data);
      console.log(obj.DATE[0]);
      console.log(obj.HOME[1000]);
      console.log(obj.VISITOR[1000]);
      console.log(obj.HOME_PTS[0]);
      console.log(obj.VISITOR_PTS[0]);
      const newEntry: ScheduleEntry = {date: obj.DATE[0], homeTeamName: this.convertTeamName(obj.HOME[0]), awayTeamName: this.convertTeamName(obj.VISITOR[0]),
        live: obj.HOME_PTS[0] != null, homeTeamScore: obj.HOME_PTS[0], awayTeamScore: obj.VISITOR_PTS[0]};
      const newEntryScheduled: ScheduleEntry = {date: obj.DATE[1000], homeTeamName: this.convertTeamName(obj.HOME[1000]), awayTeamName: this.convertTeamName(obj.VISITOR[1000]),
        live: obj.HOME_PTS[1000] != null, homeTeamScore: obj.HOME_PTS[1000], awayTeamScore: obj.VISITOR_PTS[1000]};
      this.addEntry(newEntry);
      this.addEntry(newEntryScheduled);
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
