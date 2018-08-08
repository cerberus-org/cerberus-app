import { UserInfo } from 'firebase';
import * as SessionActions from '../actions/session.actions';

export interface SessionReducerState {
  userInfo: UserInfo;
}

export const initialSessionReducerState: SessionReducerState = {
  userInfo: undefined,
};

export type Action = SessionActions.All;

export function sessionReducer(state = initialSessionReducerState, action: Action): SessionReducerState {

  switch (action.type) {

    case SessionActions.CLEAR_DATA: {
      return { ...initialSessionReducerState };
    }

    case SessionActions.SET_USER_INFO: {
      const { userInfo } = action.payload;
      return { ...state, userInfo };
    }

    default: {
      return state;
    }
  }
}
