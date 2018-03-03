import * as ModelActions from '../actions/model.actions';
import { sortVisitsByDate } from '../functions/helpers.functions';
import { Site, User, Visit, Volunteer } from '../models';

export interface State {
  sites: Site[];
  users: User[];
  visits: Visit[];
  volunteers: Volunteer[];
}

export const initialState: State = {
  sites: [],
  users: [],
  visits: [],
  volunteers: [],
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
        visits: sortVisitsByDate(action.payload),
      });
    }

    case ModelActions.LOAD_VOLUNTEERS_SUCCESS: {
      return Object.assign({}, state, {
        volunteers: action.payload,
      });
    }

    default: {
      return state;
    }
  }
}
