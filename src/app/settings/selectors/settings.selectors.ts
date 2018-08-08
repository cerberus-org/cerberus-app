import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SettingsState } from '../reducers';
import { SettingsReducerState } from '../reducers/settings.reducer';

export const getSettingsState = createFeatureSelector<SettingsState>('settingsModule');

export const getSettingsReducerState = createSelector(
  getSettingsState,
  (state: SettingsState) => state.settings,
);

export const getSelectedSettingsOption = createSelector(
  getSettingsReducerState,
  (state: SettingsReducerState) => state.selectedOption,
);
