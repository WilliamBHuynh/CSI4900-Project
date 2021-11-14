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

  constructor(private announcer: LiveAnnouncer,private router: Router) {}

  ngOnInit(): void {
    this.announcer.announce("Please use the arrow up and down keys to navigate the app, enter to select and backspace to go back.");
  }

  fontSize = 48;
  @ViewChild('navElemS', { static: true }) navElemS: ElementRef;
  @ViewChild('navElemP', { static: true }) navElemP: ElementRef;
  @ViewChild('navElemSt', { static: true }) navElemSt: ElementRef;

  @HostListener('document:keydown', ['$event']) onKeyDown(e:any){
    if (e.keyCode==83){
      this.router.navigate(['/schedule']);
    }
    else if (e.keyCode ==84){
      this.router.navigate(['/standings']);
    }
    else if (e.keyCode == 80){
      this.router.navigate(['/predictions']);
    }
    else if (e.keyCode == 187){
      this.changeFont('+')
    }
    else if (e.keyCode == 189){
      this.changeFont('-')
    }
    
  }

  changeFont(operator:any) {
    operator === '+' ? this.fontSize+=5 : this.fontSize-=5;
    (this.navElemS.nativeElement as HTMLParagraphElement).style.fontSize = `${this.fontSize}px`;
    (this.navElemP.nativeElement as HTMLParagraphElement).style.fontSize = `${this.fontSize}px`;
    (this.navElemSt.nativeElement as HTMLParagraphElement).style.fontSize = `${this.fontSize}px`;

  }

}
