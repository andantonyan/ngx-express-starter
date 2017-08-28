import { Action } from '@ngrx/store';
import { type } from '../../../util';


/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 *
 * The 'type' utility function coerces strings into string
 * literal types and runs a simple check to guarantee all
 * action types in the application are unique.
 */
export const ActionTypes = {
  ADD_ERROR: type('[Error] Add Error'),
  REMOVE_ERROR: type('[Error] Remove Error')
};

export class ErrorAddAction implements Action {
  type = ActionTypes.ADD_ERROR;

  constructor(public payload: any) { }
}

export class ErrorRemoveAction implements Action {
  type = ActionTypes.REMOVE_ERROR;

  constructor(public payload: Error) { }
}

export type Actions
  = ErrorAddAction
  | ErrorRemoveAction;
