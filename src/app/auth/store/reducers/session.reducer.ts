import { UserInfo } from 'firebase';
import { Member, Organization } from '../../../shared/models';
import * as SessionActions from '../actions/session.actions';

export interface SessionReducerState {
  organization: Organization;
  member: Member;
  userInfo: UserInfo;
}

export const initialSessionReducerState: SessionReducerState = {
  organization: undefined,
  member: undefined,
  userInfo: undefined,
};

export type Action = SessionActions.All;

export function sessionReducer(state = initialSessionReducerState, action: Action): SessionReducerState {

  switch (action.type) {

    case SessionActions.CLEAR_DATA: {
      return { ...initialSessionReducerState };
    }

    case SessionActions.LOAD_DATA_SUCCESS: {
      const { member, organization, userInfo } = action.payload;
      return { ...state, member, organization, userInfo };
    }

    case SessionActions.SET_ORGANIZATION: {
      return { ...state, organization: action.payload };
    }

    case SessionActions.SET_MEMBER_AND_USER_INFO: {
      const { member, userInfo } = action.payload;
      return { ...state, member, userInfo };
    }

    default: {
      return state;
    }
  }
}
