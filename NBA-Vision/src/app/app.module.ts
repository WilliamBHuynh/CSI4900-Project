import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { ScheduleElementComponent } from './schedule/schedule-element/schedule-element.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { RouterModule } from "@angular/router";
import { GameService } from "./service/game.service";
import { HttpClientModule } from '@angular/common/http';
import { PredictionsComponent } from './predictions/predictions.component';

@NgModule({
  declarations: [
    AppComponent,
    ScheduleComponent,
    ScheduleElementComponent,
    HomeComponent,
    PredictionsComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    RouterModule,
  ],
  providers: [GameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
