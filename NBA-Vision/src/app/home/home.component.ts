import { Component, OnInit } from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private announcer: LiveAnnouncer) {}

  ngOnInit(): void {
    this.announcer.announce("Please use the arrow up and down keys to navigate the app, enter to select and backspace to go back.");
  }
}
