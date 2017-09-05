import 'rxjs/add/operator/let';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../store';
import * as layout from '../../store/layout/layout.actions';
import { UtilService, AuthService } from '../../services';

import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { IUser } from '../../../../common/models/user';

export interface IAppComponent {
  closeSidenav(): void;
  toggleSidenav($event: Event): void;
  logOut(): void;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, IAppComponent {
  showSidenav$: Observable<boolean>;
  user$: Observable<IUser>;
  sideNavMode = 'side';
  currentSideNavState: boolean;
  constructor(private _store: Store<fromRoot.State>,
              private _router: Router,
              private _activatedRoute: ActivatedRoute,
              private _authService: AuthService) {
    this.showSidenav$ = this._store.select(fromRoot.getShowSidenav);
    this.user$ = this._store.select(fromRoot.getAuthCurrentUser);
  }

  ngOnInit(): void {
    if (UtilService.getCurrentDevice() === 'DESKTOP') {
      this._store.dispatch(new layout.OpenSidenavAction());
    } else {
      this.sideNavMode = 'push';
      this._store.dispatch(new layout.CloseSidenavAction());
    }

    this.showSidenav$.subscribe(state =>  this.currentSideNavState = state);

    this._router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
      } else if (event instanceof NavigationEnd) {
        if (UtilService.getCurrentDevice() !== 'DESKTOP') {
          this._store.dispatch(new layout.CloseSidenavAction());
        }
        const showSidenav = UtilService.getRouteDataByKey(this._activatedRoute, 'showSidenav');
        if (typeof showSidenav !== 'undefined') {
          if (showSidenav && UtilService.getCurrentDevice() === 'DESKTOP') {
            this._store.dispatch(new layout.OpenSidenavAction());
          } else {
            this._store.dispatch(new layout.CloseSidenavAction());
          }
        }
      }
    });
  }

  closeSidenav(): void {
    this._store.dispatch(new layout.CloseSidenavAction());
  }

  toggleSidenav($event: Event): void {
    $event.stopPropagation();
    if (this.currentSideNavState) {
      this._store.dispatch(new layout.CloseSidenavAction());
    } else {
      this._store.dispatch(new layout.OpenSidenavAction());
    }
  }

  // TODO: dispatch event and clear store data
  logOut(): void {
    this._authService.logOut();
  }
}
