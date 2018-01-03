import * as SettingsActions from '../actions/settings.actions';

export interface State {
  sidenavSelection: string;
}

export const initialState: State = {
  sidenavSelection: 'User',
};

export type Action = SettingsActions.All;

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {

    case SettingsActions.SET_SIDENAV_SELECTION: {
      return Object.assign({}, state, {
        sidenavSelection: action.payload
      });
    }

    default: {
      return state;
    }
  }
}
