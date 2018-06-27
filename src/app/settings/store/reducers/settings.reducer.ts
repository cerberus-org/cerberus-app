import * as SettingsActions from '../actions/settings.actions';

export interface SettingsReducerState {
  sidenavSelection: string;
}

export const initialSettingsReducerState: SettingsReducerState = {
  sidenavSelection: 'user',
};

export type Action = SettingsActions.All;

export function settingsReducer(state = initialSettingsReducerState, action: Action): SettingsReducerState {
  switch (action.type) {

    case SettingsActions.LOAD_PAGE: {
      return {
        ...state,
        sidenavSelection: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}
