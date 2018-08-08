import { UserInfo } from 'firebase';
import { AuthActionsUnion, AuthActionTypes } from '../actions/auth.actions';

export interface AuthReducerState {
  userInfo: UserInfo;
}

export const initialSessionReducerState: AuthReducerState = {
  userInfo: undefined,
};

export function authReducer(state = initialSessionReducerState, action: AuthActionsUnion): AuthReducerState {
  switch (action.type) {
    case AuthActionTypes.SetUserInfo: {
      const { userInfo } = action.payload;
      return { ...state, userInfo };
    }

    default: {
      return state;
    }
  }
}
