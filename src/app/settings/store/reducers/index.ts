import { ActionReducerMap } from '@ngrx/store';
import { settingsReducer, SettingsReducerState } from './settings.reducer';

export interface SettingsState {
  settings: SettingsReducerState;
}

export const settingsReducers: ActionReducerMap<SettingsState> = {
  settings: settingsReducer,
};
