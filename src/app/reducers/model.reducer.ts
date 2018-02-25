import * as ModelActions from '../actions/model.actions';
import { sortVisitsByDate } from '../functions/helpers';
import { Site } from '../models/site';
import { Visit } from '../models/visit';
import { Volunteer } from '../models/volunteer';

export interface State {
  sites: Site[];
  visits: Visit[];
  volunteers: Volunteer[];
}

export const initialState: State = {
  sites: [],
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
