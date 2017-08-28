import { without } from 'lodash';
import * as errorAction from './error.actions';

const initialState: Error[] = [];

export function reducer(state = initialState, action: errorAction.Actions): Error[] {
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
export const getList = (state: Error[]) => state;
