import { sortVisitsByStartedAt } from '../../../functions';
import { Organization, Site, User, Visit, Volunteer } from '../../../models';
import * as ModelActions from '../actions/model.actions';

export interface State {
  sites: Site[];
  users: User[];
  visits: Visit[];
  volunteers: Volunteer[];
  organizations: Organization[];
}

export const initialState: State = {
  sites: [],
  users: [],
  visits: [],
  volunteers: [],
  organizations: [],
};

export type Action = ModelActions.All;

export function reducer(state = initialState, action: Action): State {

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
