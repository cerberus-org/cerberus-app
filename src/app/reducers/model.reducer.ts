import * as ModelActions from '../actions/model.actions';
import { sortVisitsByDate } from '../functions/helpers.functions';
import { Organization, Site, Visit, Volunteer } from '../models';

export interface State {
  sites: Site[];
  visits: Visit[];
  volunteers: Volunteer[];
  organizations: Organization[];
}

export const initialState: State = {
  sites: [],
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

    case ModelActions.LOAD_VISITS_SUCCESS: {
      return Object.assign({}, state, {
        visits: sortVisitsByDate(action.payload),
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
