import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {ScheduleComponent} from "./schedule/schedule.component";
import {PredictionsComponent} from "./predictions/predictions.component";
import {StandingsComponent} from "./standings/standings.component";
import {BoxscoreComponent} from "./schedule/boxscore/boxscore.component";

const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'games', component: ScheduleComponent},
  {path: 'standings', component: StandingsComponent},
  {path: 'predictions', component: PredictionsComponent},
  {path: 'boxscores', component: BoxscoreComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: '**', component: HomeComponent},
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
