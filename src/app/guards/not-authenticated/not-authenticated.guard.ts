import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { of } from 'rxjs/observable/of';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../store';
import * as authAction from '../../store/auth/auth.actions';

@Injectable()
export class NotAuthenticatedGuard implements CanActivate {
  constructor(private _router: Router,
              private _authService: AuthService,
              private _store: Store<fromRoot.State>) { }

  canActivate(route: ActivatedRouteSnapshot): any {
    return this._authService.getCurrentUser()
      .map(user => {
        this._store.dispatch(new authAction.FetchUserSuccessAction(user));
        return !user;
      })
      .catch(() => of(true));
  }
}
