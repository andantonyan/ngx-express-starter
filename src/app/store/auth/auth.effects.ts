import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/takeUntil';
import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { AuthService } from '../../services/auth/auth.service';

@Injectable()
export class AuthEffects {
  // @Effect()
  // public login$ = this._actions$
  //   .ofType(authAction.ActionTypes.LOGIN)
  //   .map((action: authAction.LoginAction) => action.payload)
  //   .switchMap(options => {
  //     return this._authService.login(options)
  //       .map(response => location.reload())
  //       .catch(err => of(new authAction.LoginErrorAction(err)))
  //   });

  constructor(private _actions$: Actions, private _authService: AuthService) { }
}
