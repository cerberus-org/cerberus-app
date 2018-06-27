import { Organization, User } from '../../../models';
import * as SessionActions from '../actions/session.actions';

export interface SessionReducerState {
  organization: Organization;
  user: User;
}

export const initialSessionReducerState: SessionReducerState = {
  organization: undefined,
  user: undefined,
};

export type Action = SessionActions.All;

export function sessionReducer(state = initialSessionReducerState, action: Action): SessionReducerState {

  switch (action.type) {

    case SessionActions.LOAD_DATA_SUCCESS: {
      return { ...state, user: action.payload.user, organization: action.payload.organization };
    }

    case SessionActions.UPDATE_ORGANIZATION: {
      return { ...state, organization: action.payload };
    }

    case SessionActions.UPDATE_USER: {
      return { ...state, user: action.payload };
    }

    default: {
      return state;
    }
  }
}
