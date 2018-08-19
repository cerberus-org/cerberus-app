import { UserInfo } from 'firebase';
import { AuthActionsUnion, AuthActionTypes } from '../actions/auth.actions';

export interface AuthReducerState {
  userInfo: UserInfo;
}

export const initialAuthReducerState: AuthReducerState = {
  userInfo: undefined,
};

export function authReducer(state = initialAuthReducerState, action: AuthActionsUnion): AuthReducerState {
  switch (action.type) {
    case AuthActionTypes.SetUserInfo: {
      const { userInfo } = action.payload;
      return { ...state, userInfo };
    }

    case AuthActionTypes.ClearUserInfo: {
      return initialAuthReducerState;
    }

    default: {
      return state;
    }
  }
}
