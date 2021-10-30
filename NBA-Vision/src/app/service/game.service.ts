import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GameService {
  readonly APIUrl = "http://127.0.0.1:8000";

  constructor(private http: HttpClient) { }

  getGames(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + '/game/');
  }

  getSchedule(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + '/schedule/');
  }
}
