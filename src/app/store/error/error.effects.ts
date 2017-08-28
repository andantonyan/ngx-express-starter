import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import * as errorAction from '../../store/error/error.actions';
import 'rxjs/add/observable/forkJoin';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../store';


@Injectable()
export class ErrorEffects {
  @Effect()
  public newError$ = this._actions$
    .ofType(errorAction.ActionTypes.ADD_ERROR)
    .map((action: errorAction.ErrorAddAction) => action.payload)
    .do(error => console.error(error));

  constructor(private _actions$: Actions, private _store: Store<fromRoot.State>) { }
}
