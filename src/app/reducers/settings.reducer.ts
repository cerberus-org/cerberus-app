import * as SettingsActions from '../actions/settings.actions';
import { Volunteer } from '../models/volunteer';

export interface State {
  sidenavSelection: string;
}

export const initialState: State = {
  sidenavSelection: 'user',
};

export type Action = SettingsActions.All;

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {

    case SettingsActions.LOAD_PAGE: {
      return Object.assign({}, state, {
        sidenavSelection: action.payload
      });
    }

    default: {
      return state;
    }
  }
}
