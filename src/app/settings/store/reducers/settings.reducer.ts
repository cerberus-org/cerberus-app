import * as SettingsActions from '../actions/settings.actions';

export interface SettingsReducerState {
  sidenavSelection: string;
}

export const initialState: SettingsReducerState = {
  sidenavSelection: 'user',
};

export type Action = SettingsActions.All;

export function settingsReducer(state = initialState, action: Action): SettingsReducerState {
  switch (action.type) {

    case SettingsActions.LOAD_PAGE: {
      return Object.assign({}, state, {
        sidenavSelection: action.payload,
      });
    }

    default: {
      return state;
    }
  }
}
