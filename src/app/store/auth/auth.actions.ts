import { Action } from '@ngrx/store';
import { type } from '../../../util';
import { ILoginRequest, ILoginResponse } from '../../models/api';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 *
 * The 'type' utility function coerces strings into string
 * literal types and runs a simple check to guarantee all
 * action types in the application are unique.
 */
export const ActionTypes = {
  LOGIN: type('[Auth] Login'),
  LOGIN_SUCCESS: type('[Auth] Login Success'),
  LOGIN_ERROR: type('[Auth] Login Error'),
};

export class LoginAction implements Action {
  type = ActionTypes.LOGIN;

  constructor(public payload: ILoginRequest) { }
}

export class LoginSuccessAction implements Action {
  type = ActionTypes.LOGIN_SUCCESS;

  constructor(public payload: ILoginResponse) { }
}

export class LoginErrorAction implements Action {
  type = ActionTypes.LOGIN_ERROR;

  constructor(public payload: any) { }
}

export type Actions
  = LoginAction
  | LoginSuccessAction
  | LoginErrorAction;
