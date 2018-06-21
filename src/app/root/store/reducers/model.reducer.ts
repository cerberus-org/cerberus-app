import { sortVisitsByStartedAt } from '../../../functions';
import { Organization, Site, User, Visit, Volunteer } from '../../../models';
import * as ModelActions from '../actions/model.actions';

export interface ModelReducerState {
  sites: Site[];
  users: User[];
  visits: Visit[];
  volunteers: Volunteer[];
  organizations: Organization[];
}

export const initialState: ModelReducerState = {
  sites: [],
  users: [],
  visits: [],
  volunteers: [],
  organizations: [],
};

export type Action = ModelActions.All;

export function modelReducer(state = initialState, action: Action): ModelReducerState {
  switch (action.type) {
    case ModelActions.LOAD_SITES_SUCCESS: {
      return Object.assign({}, state, {
        sites: action.payload,
      });
    }

    case ModelActions.LOAD_USERS_SUCCESS: {
      return Object.assign({}, state, {
        users: action.payload,
      });
    }

    case ModelActions.LOAD_VISITS_SUCCESS: {
      return Object.assign({}, state, {
        visits: sortVisitsByStartedAt(action.payload),
      });
    }

    case ModelActions.LOAD_VOLUNTEERS_SUCCESS: {
      return Object.assign({}, state, {
        volunteers: action.payload,
      });
    }

    case ModelActions.LOAD_ORGANIZATIONS_SUCCESS: {
      return Object.assign({}, state, {
        organizations: action.payload,
      });
    }

    default: {
      return state;
    }
  }
}
