import { Component, OnDestroy, OnInit } from '@angular/core';

export interface IDashboardComponent {
  sayHallo(): void;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy, IDashboardComponent {
  constructor() {
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
  }

  sayHallo(): void {
  }

}
