import * as SettingsActions from '../actions/settings.actions';
import { Volunteer } from '../models/volunteer';

export interface State {
  sidenavSelection: string;
  volunteers: Volunteer[];
}

export const initialState: State = {
  sidenavSelection: 'User',
  volunteers: null
};

export type Action = SettingsActions.All;

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {

    case SettingsActions.LOAD_PAGE: {
      return Object.assign({}, state, {
        sidenavSelection: action.payload
      });
    }

    case SettingsActions.LOAD_VOLUNTEERS_PAGE_SUCCESS: {
      return Object.assign({}, state, {
        volunteers: action.payload
      });
    }

    default: {
      return state;
    }
  }
}
