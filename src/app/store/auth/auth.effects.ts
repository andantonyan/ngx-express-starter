import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/takeUntil';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { AuthService } from '../../services/auth/auth.service';
import * as authAction from '../../store/auth/auth.actions';
import * as errorAction from '../../store/error/error.actions';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/observable/forkJoin';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../store';

@Injectable()
export class AuthEffects {
  @Effect()
  public login$ = this._actions$
    .ofType(authAction.ActionTypes.LOGIN)
    .map((action: authAction.LoginAction) => action.payload)
    .switchMap(options => {
      return this._authService.login(options)
        .map(response => new authAction.LoginSuccessAction(response))
        .catch(err => {
          this._store.dispatch(new errorAction.ErrorAddAction(err.error));
          return of(new authAction.LoginErrorAction(err));
        });
    });

  constructor(private _actions$: Actions, private _authService: AuthService, private _store: Store<fromRoot.State>) { }
}
