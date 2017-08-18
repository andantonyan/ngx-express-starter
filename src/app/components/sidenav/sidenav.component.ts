import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../store';

interface ISidenavComponent {
  onClick($event: Event): void;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements ISidenavComponent, OnInit {
  @Input() open = false;
  @Input() mode: string;
  @Output() onItemActivate = new EventEmitter();
  @Output() onClose = new EventEmitter();
  isHomeActive;
  constructor(private _router: Router, private _store: Store<fromRoot.State>) {
  }

  ngOnInit(): void {
    this._router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {

      } else if (event instanceof NavigationEnd) {
        this.isHomeActive = this._router.url === '/' ? 'is-active' : '';
      }
    });
  }

  onClick($event: Event): void {
    $event.stopPropagation();
  }
}
