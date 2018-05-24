import * as AuthActions from '../actions/auth.actions';
import { Organization, User } from '../models';

export interface State {
  organization: Organization;
  user: User;
}

export const initialState: State = {
  organization: undefined,
  user: undefined,
};

export type Action = AuthActions.All;

export function reducer(state = initialState, action: Action): State {

  switch (action.type) {

    case AuthActions.LOAD_DATA_SUCCESS: {
      return Object.assign({}, state, {
        user: action.payload.user,
        organization: action.payload.organization,
      });
    }

    case AuthActions.UPDATE_ORGANIZATION: {
      return Object.assign({}, state, {
        organization: action.payload,
      });
    }

    case AuthActions.UPDATE_USER: {
      return Object.assign({}, state, {
        user: action.payload,
      });
    }

    default: {
      return state;
    }
  }
}
