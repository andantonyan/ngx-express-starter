import { createSelector } from 'reselect';
import { without, filter } from 'lodash';
import * as errorAction from './error.actions';
import { HttpErrorResponse } from '@angular/common/http';

const initialState: any = [];

export function reducer(state = initialState, action: errorAction.Actions): any[] {
  switch (action.type) {
    case errorAction.ActionTypes.ADD_ERROR: {
      return state.concat([action.payload]);
    }

    case errorAction.ActionTypes.REMOVE_ERROR: {
      return without(state, action.payload);
    }

    default: {
      return state;
    }
  }
}
export const getAll = (state: any[]) => state;
export const getHttp = createSelector(getAll, (errors) => {
  return filter(errors, error => error instanceof HttpErrorResponse);
});
export const getLoginHttp = createSelector(getHttp, (errors) => {
  return filter(errors, error => error.url.match(/api\/auth\/login/));
});
