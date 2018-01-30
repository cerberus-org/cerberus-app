import * as SettingsActions from '../actions/settings.actions';
import { Visit } from '../models/visit';

export interface State {
  sidenavSelection: string;
  visits: Visit[];
}

export const initialState: State = {
  sidenavSelection: 'User',
  visits: null,
};

export type Action = SettingsActions.All;

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {

    case SettingsActions.SET_SIDENAV_SELECTION: {
      return Object.assign({}, state, {
        sidenavSelection: action.payload
      });
    }

    case SettingsActions.LOAD_VISITS_BY_DATE_AND_ORGANIZATION_SUCCESS: {
      return Object.assign({}, state, {
        visits: action.payload
      });
    }

    default: {
      return state;
    }
  }
}
