import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { HostListener } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  shortCutsMsg = "Hold the alt key and the following key for keyboard shortcuts: " +
                "G for games, S for standings, P for predictions. " +
                "Minus to zoom out, and plus to zoom in.";
  constructor(private announcer: LiveAnnouncer,private router: Router) {}

  ngOnInit(): void {
    this.announcer.announce(
      "Home screen. " + this.shortCutsMsg);
  }

  fontSize = 48;
  @ViewChild('navElemS', { static: true }) navElemS: ElementRef;
  @ViewChild('navElemP', { static: true }) navElemP: ElementRef;
  @ViewChild('navElemSt', { static: true }) navElemSt: ElementRef;

  @HostListener('document:keydown', ['$event']) onKeyDown(e:any){
    if (e.keyCode == 71){
      this.navGames();
    }
    else if (e.keyCode == 83){
      this.navStandings();
    }
    else if (e.keyCode == 80){
      this.navPredictions();
    }
    else if (e.keyCode == 187){
      this.changeFont('+')
    }
    else if (e.keyCode == 189){
      this.changeFont('-')
    }
  }

  navGames(): void {
    this.router.navigate(['/games']);
  }

  navStandings(): void {
    this.router.navigate(['/standings']);
  }

  navPredictions(): void {
    this.router.navigate(['/predictions']);
  }

  changeFont(operator:any) {

    if (this.fontSize > 250){
      this.fontSize=250
    }
    else if (this.fontSize<20){
      this.fontSize=20
    }
    operator === '+' ? this.fontSize+=5 : this.fontSize-=5;
    (this.navElemS.nativeElement as HTMLParagraphElement).style.fontSize = `${this.fontSize}px`;
    (this.navElemP.nativeElement as HTMLParagraphElement).style.fontSize = `${this.fontSize}px`;
    (this.navElemSt.nativeElement as HTMLParagraphElement).style.fontSize = `${this.fontSize}px`;

  }
}
