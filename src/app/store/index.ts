export { AuthEffects } from './auth/auth.effects';
export { ErrorEffects } from './error/error.effects';

import { createSelector } from 'reselect';
import { ActionReducer, combineReducers } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import { environment } from '../../environments/environment';
import { compose } from '@ngrx/core/compose';
import { storeFreeze } from 'ngrx-store-freeze';
import * as fromAuth from './auth/auth.reducer';
import * as fromError from './error/error.reducer';
import * as fromLayout from './layout/layout.reducer';

/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface State {
  auth: fromAuth.State;
  error: Error[];
  layout: fromLayout.State;
}


/**
 * Because metareducers take a reducer function and return a new reducer,
 * we can use our compose helper to chain them together. Here we are
 * using combineReducers to make our top level reducer, and then
 * wrapping that in storeLogger. Remember that compose applies
 * the result from right to left.
 */
const reducers = {
  auth: fromAuth.reducer,
  error: fromError.reducer,
  router: fromRouter.routerReducer,
  layout: fromLayout.reducer
};


const developmentReducer: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);
const productionReducer: ActionReducer<State> = combineReducers(reducers);

export function reducer(state: any, action: any) {
  if (environment.production) {
    return productionReducer(state, action);
  } else {
    return developmentReducer(state, action);
  }
}

export const getAuthState = (state: State) => state.auth;
export const getErrorState = (state: State) => state.error;

/**
 * Auth Reducers
 */
export const getAuthCurrentUser = createSelector(getAuthState, fromAuth.getCurrentUser);

/**
 * Layout Reducers
 */
export const getLayoutState = (state: State) => state.layout;
export const getShowSidenav = createSelector(getLayoutState, fromLayout.getShowSidenav);

/**
 * Error Reducers
 */
export const getErrors = createSelector(getErrorState, fromError.getList);
