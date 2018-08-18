import { SettingsActionsUnion, SettingsActionTypes } from '../actions/settings.actions';

export interface SettingsReducerState {
  selectedOption: string;
}

export const initialSettingsReducerState: SettingsReducerState = {
  selectedOption: 'TEAM',
};

export function settingsReducer(
  state = initialSettingsReducerState,
  action: SettingsActionsUnion,
): SettingsReducerState {
  switch (action.type) {
    case SettingsActionTypes.SelectSettingsOption: {
      const { selectedOption } = action.payload;
      return { ...state, selectedOption };
    }

    default: {
      return state;
    }
  }
}
