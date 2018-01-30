import * as SettingsActions from '../actions/settings.actions';
import { Visit } from '../models/visit';
import { Volunteer } from '../models/volunteer';

export interface State {
  sidenavSelection: string;
  visits: Visit[];
  volunteers: Volunteer[];
}

export const initialState: State = {
  sidenavSelection: 'User',
  visits: null,
  volunteers: null
};

export type Action = SettingsActions.All;

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {

    case SettingsActions.DELETE_VOLUNTEER_SUCCESS: {
      return Object.assign({}, state, {
        volunteers: state.volunteers.filter(volunteer => volunteer !== action.payload)
      })
    }

    case SettingsActions.LOAD_PAGE: {
      return Object.assign({}, state, {
        sidenavSelection: action.payload
      });
    }

    case SettingsActions.LOAD_VISITS_BY_DATE_AND_ORGANIZATION_SUCCESS: {
      return Object.assign({}, state, {
        visits: action.payload
      });
    }

    case SettingsActions.LOAD_VOLUNTEERS_PAGE_SUCCESS: {
      return Object.assign({}, state, {
        sidenavSelection: 'volunteers',
        volunteers: action.payload
      });
    }

    default: {
      return state;
    }
  }
}
