import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {GameService} from "../service/game.service";
import { Observable } from 'rxjs';
import { DOCUMENT } from '@angular/common'; 
import { ScheduleEntry } from '../schedule/schedule-entry';



@Component({
  selector: 'app-predictions',
  templateUrl: './predictions.component.html',
  styleUrls: ['./predictions.component.css']
})
export class PredictionsComponent implements OnInit {

  constructor(private service: GameService) {
    
   }

  ngOnInit(): void {
  }

  getPrediction(){
    this.service.getPrediction().subscribe(prediction => console.log(prediction))
    //console.log(JSON)
  }

}
