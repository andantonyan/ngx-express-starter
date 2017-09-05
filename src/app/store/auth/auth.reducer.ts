import { assign } from 'lodash';
import * as authAction from './auth.actions';
import { IUser } from '../../../../common/models/user';

export interface State {
  user: IUser;
}

const initialState: State = {
  user: null,
};

export function reducer(state = initialState, action: authAction.Actions): State {
  switch (action.type) {
    case authAction.ActionTypes.LOGIN_SUCCESS: {
      const user = action.payload.user;
      return assign({}, state, { user });
    }

    case authAction.ActionTypes.LOGIN_ERROR: {
      const error: any = action.payload;
      return assign({}, state, { user: null });
    }

    case authAction.ActionTypes.FETCH_USER_SUCCESS: {
      const user = action.payload;
      return assign({}, state, { user });
    }

    case authAction.ActionTypes.FETCH_USER_ERROR: {
      const error: any = action.payload;
      return assign({}, state, { user: null });
    }

    default: {
      return state;
    }
  }
}
export const getCurrentUser = (state: State) => state.user;
