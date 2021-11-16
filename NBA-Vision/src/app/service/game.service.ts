import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GameService {
  readonly APIUrl = "http://127.0.0.1:8000";
  predData :any;

  constructor(private http: HttpClient) { }

  getSchedule(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + '/schedule/');
  }

  getStanding(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + '/standing/');
  }

  getPrediction(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + '/prediction/');
  }

  getBoxScores(params: string): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + '/boxscore/' + params);
  }

}
