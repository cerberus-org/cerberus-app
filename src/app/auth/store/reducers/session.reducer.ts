import { Organization, User } from '../../../models/index';
import * as SessionActions from '../actions/session.actions';

export interface SessionReducerState {
  organization: Organization;
  user: User;
}

export const initialState: SessionReducerState = {
  organization: undefined,
  user: undefined,
};

export type Action = SessionActions.All;

export function sessionReducer(state = initialState, action: Action): SessionReducerState {

  switch (action.type) {

    case SessionActions.LOAD_DATA_SUCCESS: {
      return Object.assign({}, state, {
        user: action.payload.user,
        organization: action.payload.organization,
      });
    }

    case SessionActions.UPDATE_ORGANIZATION: {
      return Object.assign({}, state, {
        organization: action.payload,
      });
    }

    case SessionActions.UPDATE_USER: {
      return Object.assign({}, state, {
        user: action.payload,
      });
    }

    default: {
      return state;
    }
  }
}
