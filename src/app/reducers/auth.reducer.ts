///<reference path="../actions/app.actions.ts"/>
import * as AppActions from '../actions/app.actions';
import { Organization } from '../models/organization';
import { User } from '../models/user';

export interface State {
  user: User;
  organization: Organization;
}

export const initialState: State = {
  user: null,
  organization: null,
};

export type Action = AppActions.All;

export function reducer(state = initialState, action: Action): State {

  switch (action.type) {

    case AppActions.LOAD_DATA_SUCCESS: {
      return Object.assign({}, state, {
        user: action.payload.user,
        organization: action.payload.organization,
      });
    }

    case AppActions.SET_ORGANIZATION: {
      return Object.assign({}, state, {
        organization: action.payload,
      });
    }

    case AppActions.SET_USER: {
      return Object.assign({}, state, {
        user: action.payload,
      });
    }

    default: {
      return state;
    }
  }
}
