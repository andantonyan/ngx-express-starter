import { Component, OnDestroy, OnInit } from '@angular/core';

export interface IHomeComponent {
  sayHallo(): void;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy, IHomeComponent {
  constructor() {
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
  }

  sayHallo(): void {
  }

}
