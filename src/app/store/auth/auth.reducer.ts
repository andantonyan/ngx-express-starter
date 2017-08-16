import * as authAction from './auth.actions';

export interface State {
  user: any;
}

const initialState: State = {
  user: null,
};

export function reducer(state = initialState, action: authAction.Actions): State {
  switch (action.type) {
    // case authAction.ActionTypes.LOGIN_SUCCESS: {
    //   const user = action.payload;
    //   return assign({}, state, { user });
    // }
    //
    // case authAction.ActionTypes.LOGIN_ERROR: {
    //   const error: any = action.payload;
    //   return assign({}, state, { user: null });
    // }

    default: {
      return state;
    }
  }
}
export const getCurrentUser = (state: State) => state.user;
