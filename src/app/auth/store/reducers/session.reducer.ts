import { User } from 'firebase';
import { Member, Organization } from '../../../models';
import * as SessionActions from '../actions/session.actions';

export interface SessionReducerState {
  organization: Organization;
  member: Member;
  user: User;
}

export const initialSessionReducerState: SessionReducerState = {
  organization: undefined,
  member: undefined,
  user: undefined,
};

export type Action = SessionActions.All;

export function sessionReducer(state = initialSessionReducerState, action: Action): SessionReducerState {

  switch (action.type) {

    case SessionActions.CLEAR_DATA: {
      return { ...initialSessionReducerState };
    }

    case SessionActions.LOAD_DATA_SUCCESS: {
      const { member, organization } = action.payload;
      return { ...state, member, organization };
    }

    case SessionActions.SET_ORGANIZATION: {
      return { ...state, organization: action.payload };
    }

    case SessionActions.SET_USER: {
      const { member, user } = action.payload;
      return { ...state, member, user };
    }

    default: {
      return state;
    }
  }
}
